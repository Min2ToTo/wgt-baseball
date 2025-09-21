

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { GameScreen } from './components/GameScreen';
import { MainScreen } from './components/MainScreen';
import { GameContext, GameContextType } from './contexts/GameContext';
import { GameMode, Language, Theme } from './types';
import { translations } from './i18n/translations';
import { LanguageSelectionModal } from './components/modals/LanguageSelectionModal';
import { HelpModal } from './components/modals/HelpModal';
import { ethers } from 'ethers';
import { AchievementsScreen } from './components/AchievementsScreen';
import { RankingScreen } from './components/RankingScreen';

// World App Bridge type definition (simplified)
declare global {
    interface Window {
        worldapp?: {
            getUser: () => Promise<{ isVerified: boolean; worldIdAddress: string | null; } | null>;
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
    const [isLoading, setIsLoading] = useState(true);
    const [isStandaloneMode, setIsStandaloneMode] = useState(false);
    const [authStatusMessage, setAuthStatusMessage] = useState('Connecting to World App...');

    // World ID and Assets
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [wgt, setWgt] = useState(0);
    
    useEffect(() => {
        const savedLang = localStorage.getItem('wgt-baseball-lang') as Language;
        if (savedLang && translations[savedLang]) {
            setLanguage(savedLang);
        } else {
            setIsLanguageModalOpen(true);
        }
    }, []);

    // World App Integration Effect
    useEffect(() => {
        const MAX_RETRIES = 10;
        const RETRY_DELAY = 300; // ms
        let attempt = 0;
        let themeUnsubscribe: (() => void) | undefined;

        const initializeWorldApp = async () => {
            try {
                // Subscribe to theme changes
                themeUnsubscribe = window.worldapp!.theme.subscribe((newTheme) => {
                    setTheme(newTheme === 'dark' ? 'dark' : 'light');
                });

                // Get user data
                const user = await window.worldapp!.getUser();
                if (user?.isVerified && user.worldIdAddress) {
                    setWalletAddress(user.worldIdAddress);
                    setAuthStatusMessage('User verified successfully!');
                } else {
                    console.log("[AUTH] User is not verified with World ID or not logged in.");
                    setAuthStatusMessage('Please verify with World ID in World App to play.');
                }
            } catch (error) {
                console.error("[AUTH] Error initializing World App bridge:", error);
                setAuthStatusMessage('An error occurred during verification.');
            } finally {
                setIsLoading(false);
            }
        };

        const checkForBridge = () => {
            if (typeof window.worldapp !== 'undefined') {
                console.log("[AUTH] World App bridge found. Initializing...");
                setAuthStatusMessage('World App connection successful. Verifying user...');
                initializeWorldApp();
            } else {
                attempt++;
                if (attempt < MAX_RETRIES) {
                    const msg = `World App not found. Retrying... (Attempt ${attempt}/${MAX_RETRIES})`;
                    console.log(`[AUTH] ${msg}`);
                    setAuthStatusMessage(msg);
                    setTimeout(checkForBridge, RETRY_DELAY);
                } else {
                    const msg = `Could not connect to World App after ${MAX_RETRIES} attempts.`;
                    console.warn(`[AUTH] ${msg} Running in standalone debug mode.`);
                    setAuthStatusMessage(msg);
                    setIsStandaloneMode(true);
                    setWalletAddress('0xDEBUG000000000000000000000000000000000000');
                    setIsLoading(false);
                }
            }
        };
        
        console.log("[AUTH] Starting authentication process...");
        setAuthStatusMessage('Connecting to World App...');
        checkForBridge();

        return () => {
            if (themeUnsubscribe) {
                themeUnsubscribe();
            }
        };
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
                // For this MVP simulation with a new user / if contract call fails:
                setWgt(150); 
            }
        };

        fetchBalances();
    }, [walletAddress]);

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

        if (typeof result !== 'string' && typeof result !== 'object') {
             console.error(`Translation for key '${key}' is not a string or object.`);
             return key;
        }
        
        if (typeof result === 'object' && result !== null) {
            // If the result is an object, it's likely a structured message.
            // Returning it as-is or a formatted string might be necessary depending on usage.
            // For now, let's just return the key as a fallback for objects.
            console.warn(`Translation for key '${key}' is an object, which is not directly renderable as a string.`);
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
    }), [wgt, startGame, quitGame, showAchievements, showRanking, t, language, isLanguageModalOpen, isHelpModalOpen, walletAddress, theme]);

    const PreloadView = () => (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
             <h1 className="text-4xl font-bold text-center font-orbitron">
                {t('common.title')}
            </h1>
            {isLoading ? (
                <div className="my-8 flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                    <p className="text-text-muted">{authStatusMessage}</p>
                </div>
            ) : isStandaloneMode ? (
                 <div className="my-8 w-full">
                    <div className="p-3 bg-danger/10 border border-danger text-danger rounded-lg mb-4">
                        <p className="font-bold text-sm">{authStatusMessage}</p>
                    </div>
                    <p className="text-text-muted">
                        {t('main.standalone.line1')}
                        <br/>
                        {t('main.standalone.line2')}
                    </p>
                </div>
            ) : (
                <p className="my-8 text-text-muted">
                    {authStatusMessage}
                </p>
            )}
        </div>
    );

    const renderContent = () => {
        if (!walletAddress) {
            return <PreloadView />;
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
            <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
        </GameContext.Provider>
    );
};

export default App;
