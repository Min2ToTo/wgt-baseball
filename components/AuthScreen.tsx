import React from 'react';
import { useGame } from '../contexts/GameContext';
import { Button } from './ui/Button';

const LoadingSpinner: React.FC = () => (
    <svg className="animate-spin h-10 w-10 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const WorldIdIcon: React.FC = () => (
    <svg className="h-20 w-20 text-text-base" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12zm12 6a6 6 0 100-12 6 6 0 000 12zm0-2a4 4 0 110-8 4 4 0 010 8zm0-2a2 2 0 100-4 2 2 0 000 4z" fill="currentColor"/>
    </svg>
);

export const AuthScreen: React.FC = () => {
    const { t, authState, handleAuthentication } = useGame();

    const renderContent = () => {
        if (authState === 'loading') {
            return (
                <>
                    <LoadingSpinner />
                    <p className="mt-4 text-text-muted">{t('auth.connecting')}</p>
                </>
            );
        }
        
        // Default 'unverified' state
        return (
             <>
                <WorldIdIcon />
                <h2 className="text-xl font-bold mt-6">{t('auth.verifyTitle')}</h2>
                <p className="mt-2 text-text-muted">{t('auth.verifyDescription')}</p>
                <Button onClick={handleAuthentication} className="mt-8 w-full">
                    {t('auth.verifyAction')}
                </Button>
            </>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <h1 className="text-4xl font-bold text-center font-orbitron mb-auto flex-shrink-0 mt-12">
                {t('common.title')}
            </h1>
            <div className="flex flex-col items-center justify-center w-full mb-auto">
                 {renderContent()}
            </div>
        </div>
    );
};