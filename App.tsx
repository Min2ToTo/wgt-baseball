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
import { WORLD_ID_ACTION_IDENTIFIER } from './constants';
import { MiniKit, VerificationLevel } from '@worldcoin/minikit-js';

// World App Bridge type definition is now handled by MiniKit

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
    const [authState, setAuthState] = useState<AuthState>('unverified'); // Start as unverified
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [wgt, setWgt] = useState(0);

    // Onboarding State
    const [isOnboarding, setIsOnboarding] = useState(false);
    
    const handleAuthentication = useCallback(async () => {
        if (!MiniKit.isInstalled()) {
            console.warn("MiniKit not found. Running in standalone debug mode.");
            setAuthState('verified');
            setWalletAddress('0xDEBUG000000000000000000000000000000000000');
            return;
        }

        setAuthState('loading');
        try {
            const { finalPayload } = await MiniKit.commandsAsync.verify({
                action: WORLD_ID_ACTION_IDENTIFIER,
                verification_level: VerificationLevel.Orb,
            });

            if (finalPayload.status === 'success' && finalPayload.proof) {
                // In a real app, this proof MUST be verified on a backend.
                // For this MVP, we trust the successful proof generation as verification.
                // The nullifier_hash from the payload is a representation of the user's unique identity.
                setWalletAddress(finalPayload.nullifier_hash); 
                setAuthState('verified');
                if (isOnboarding) {
                    setIsHelpModalOpen(true);
                }
            } else {
                console.error('Verification failed or was cancelled.', finalPayload);
                setAuthState('error');
            }
        } catch (error) {
            console.error("Error during MiniKit verification:", error);
            setAuthState('error');
        }
    }, [isOnboarding]);

    useEffect(() => {
        const savedLang = localStorage.getItem('wgt-baseball-lang') as Language;
        const hasOnboarded = localStorage.getItem('wgt-baseball-onboarded') === 'true';

        if (savedLang && translations[savedLang]) {
            setLanguage(savedLang);
        } else {
            setIsOnboarding(true);
            setIsLanguageModalOpen(true);
        }

        const themeUnsubscribe = MiniKit.subscribe('theme', (newTheme) => {
            setTheme(newTheme.theme === 'dark' ? 'dark' : 'light');
        });

        return () => {
           themeUnsubscribe();
        };
    }, []);
    
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('wgt-baseball-theme', theme);
    }, [theme]);

    useEffect(() => {
        if (!walletAddress) return;

        const fetchBalances = async () => {
            console.log(`User is considered logged in. Unique Nullifier Hash: ${walletAddress}`);
            console.log("Since real-time balance fetching requires a real contract and wallet, we'll use mock data.");
            setWgt(150);
        };

        fetchBalances();
    }, [walletAddress]);
    
    const handleLanguageSelected = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('wgt-baseball-lang', lang);
        setIsLanguageModalOpen(false);
    };

    const handleCloseHelpModal = () => {
        setIsHelpModalOpen(false);
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
        isAuthenticated: authState === 'verified',
        theme,
        setTheme,
        authState,
        onSelectLanguage: handleLanguageSelected,
        onCloseHelpModal: handleCloseHelpModal,
        handleAuthentication,
    }), [wgt, startGame, quitGame, showAchievements, showRanking, t, language, isLanguageModalOpen, isHelpModalOpen, walletAddress, theme, authState, handleAuthentication]);

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