import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { GameScreen } from './components/GameScreen';
import { MainScreen } from './components/MainScreen';
import { GameContext, GameContextType } from './contexts/GameContext';
import { GameMode, Language, Theme, AuthState } from './types';
import { translations } from './i18n/translations';
import { LanguageSelectionModal } from './components/modals/LanguageSelectionModal';
import { HelpModal } from './components/modals/HelpModal';
import { ethers } from 'ethers';
import { AchievementsScreen } from './components/AchievementsScreen';
import { RankingScreen } from './components/RankingScreen';
import { AuthScreen } from './components/AuthScreen';
import { WORLDCOIN_APP_ID } from './constants';

// World App Bridge type definition (simplified)
declare global {
    interface Window {
        worldapp?: {
            getUser: (params: { app_id: string }) => Promise<{ isVerified: boolean; worldIdAddress: string | null; } | null>;
            theme: {
                subscribe: (callback: (theme: 'light' | 'dark') => void) => () => void;
            };
        }
    }
}

// TODO: Replace with your actual deployed contract address and ABI
const WGT_CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000'; // Using a placeholder address
const WGT_CONTRACT_ABI = [
    // A minimal ABI for balanceOf
    "function balanceOf(address owner) view returns (uint256)"
];
// TODO: Replace with a valid RPC URL (e.g., from Alchemy or Infura for the correct network)
const RPC_URL = 'https://rpc.sepolia.org'; // Example public RPC for Sepolia testnet

const App: React.FC = () => {
    const [screen, setScreen] = useState<'main' | 'game' | 'achievements' | 'ranking'>('main');
    const [gameMode, setGameMode] = useState<GameMode | null>(null);
    const [language, setLanguage] = useState<Language>('en');
    const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [theme, setTheme] = useState<Theme>('light');
    
    // Authentication & User Data
    const [authState, setAuthState] = useState<AuthState>('loading');
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [wgt, setWgt] = useState(0);

    // Onboarding State
    const [isOnboarding, setIsOnboarding] = useState(false);
    
    // Step 2: World App Authentication
    const handleAuthentication = useCallback(async () => {
        if (typeof window.worldapp === 'undefined') {
            console.warn("World App bridge not found. Running in standalone mode for debugging.");
            setWalletAddress('0xDEBUG000000000000000000000000000000000000');
            setAuthState('verified');
            return;
        }

        setAuthState('loading');
        try {
            const user = await window.worldapp.getUser({ app_id: WORLDCOIN_APP_ID });
            if (user?.isVerified && user.worldIdAddress) {
                setWalletAddress(user.worldIdAddress);
                setAuthState('verified');
                // If this was the first run, show the help modal after successful auth
                if (isOnboarding) {
                    setIsHelpModalOpen(true);
                }
            } else {
                setAuthState('unverified');
            }
        } catch (error) {
            console.error("Error authenticating with World App:", error);
            setAuthState('error');
        }
    }, [isOnboarding]);

    // Step 1: Language and Onboarding Check (runs once on mount)
    useEffect(() => {
        const savedLang = localStorage.getItem('wgt-baseball-lang') as Language;
        const hasOnboarded = localStorage.getItem('wgt-baseball-onboarded') === 'true';

        if (savedLang && translations[savedLang]) {
            setLanguage(savedLang);
            // Language is set, proceed directly to authentication
            handleAuthentication();
        } else {
            // First time user: start onboarding
            setIsOnboarding(true);
            setIsLanguageModalOpen(true);
        }

        // Subscribe to theme changes from World App
        const themeUnsubscribe = window.worldapp?.theme.subscribe((newTheme) => {
            setTheme(newTheme === 'dark' ? 'dark' : 'light');
        });

        return () => {
            if (themeUnsubscribe) {
                themeUnsubscribe();
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('wgt-baseball-theme', theme);
    }, [theme]);

    // Fetch user balances when wallet address is available
    useEffect(() => {
        if (!walletAddress) return;

        const fetchBalances = async () => {
            console.log(`Attempting to fetch balances for ${walletAddress}...`);
            try {
                const provider = new ethers.JsonRpcProvider(RPC_URL);
                const contract = new ethers.Contract(WGT_CONTRACT_ADDRESS, WGT_CONTRACT_ABI, provider);
                const wgtBalance = await contract.balanceOf(walletAddress);
                const formattedBalance = Number(ethers.formatUnits(wgtBalance, 18));
                
                console.log('Successfully fetched balance from contract:', formattedBalance);
                setWgt(formattedBalance);

            } catch (error) {
                console.error("Could not fetch balance from contract. This is expected if the contract address and RPC URL are placeholders.", error);
                console.log("Falling back to mock data for MVP.");
                setWgt(150); 
            }
        };

        fetchBalances();
    }, [walletAddress]);
    
    // Onboarding flow handlers
    const handleLanguageSelected = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('wgt-baseball-lang', lang);
        setIsLanguageModalOpen(false);
        // Language selected, now proceed to authentication
        handleAuthentication();
    };

    const handleCloseHelpModal = () => {
        setIsHelpModalOpen(false);
        // If we were in the onboarding flow, mark it as complete
        if (isOnboarding) {
            localStorage.setItem('wgt-baseball-onboarded', 'true');
            setIsOnboarding(false);
        }
    };

    const t = useCallback((key: string, params?: { [key: string]: string | number }) => {
        const keys = key.split('.');
        let result: any = translations[language];
        for (const k of keys) {
            result = result?.[k];
            if (result === undefined) return key;
        }

        if (Array.isArray(result)) {
            result = result[Math.floor(Math.random() * result.length)];
        }

        if (typeof result !== 'string') {
             console.error(`Translation for key '${key}' is not a string.`);
             return key;
        }

        if (params) {
            return result.replace(/\{\{(\w+)\}\}/g, (match, placeholder) => {
                return params[placeholder] !== undefined ? String(params[placeholder]) : match;
            });
        }
        
        return result;
    }, [language]);

    const startGame = useCallback((mode: GameMode) => {
        setGameMode(mode);
        setScreen('game');
    }, []);

    const quitGame = useCallback(() => {
        setGameMode(null);
        setScreen('main');
    }, []);

    const showAchievements = useCallback(() => setScreen('achievements'), []);
    const showRanking = useCallback(() => setScreen('ranking'), []);

    const contextValue: GameContextType = useMemo(() => ({
        wgt,
        setWgt,
        startGame,
        quitGame,
        showAchievements,
        showRanking,
        t,
        language,
        setLanguage,
        isLanguageModalOpen,
        setIsLanguageModalOpen,
        isHelpModalOpen,
        setIsHelpModalOpen,
        walletAddress,
        isAuthenticated: !!walletAddress,
        theme,
        setTheme,
        authState,
        onSelectLanguage: handleLanguageSelected,
        onCloseHelpModal: handleCloseHelpModal,
    }), [wgt, startGame, quitGame, showAchievements, showRanking, t, language, isLanguageModalOpen, isHelpModalOpen, walletAddress, theme, authState]);

    const renderContent = () => {
        if (authState !== 'verified') {
            return <AuthScreen />;
        }
        switch (screen) {
            case 'game':
                return gameMode ? <GameScreen mode={gameMode} /> : <MainScreen />;
            case 'achievements':
                return <AchievementsScreen />;
            case 'ranking':
                return <RankingScreen />;
            case 'main':
            default:
                return <MainScreen />;
        }
    };

    return (
        <GameContext.Provider value={contextValue}>
            <div className="min-h-screen bg-surface-base font-sans flex items-center justify-center p-4">
                <div className="w-full max-w-md mx-auto bg-surface-raised rounded-2xl shadow-2xl overflow-hidden border-2 border-surface-inset flex flex-col" style={{height: '90vh', maxHeight: '800px'}}>
                    {renderContent()}
                </div>
            </div>
            <LanguageSelectionModal isOpen={isLanguageModalOpen} />
            <HelpModal isOpen={isHelpModalOpen} onClose={handleCloseHelpModal} />
        </GameContext.Provider>
    );
};

export default App;