import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

const SuccessIcon: React.FC = () => (
    <svg className="h-12 w-12 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ErrorIcon: React.FC = () => (
    <svg className="h-12 w-12 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

interface NotificationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
    const { notification, t } = useGame();

    if (!isOpen || !notification) return null;
    
    const { type, title, message } = notification;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="text-center flex flex-col items-center">
                <div className="mb-4">
                    {type === 'success' ? <SuccessIcon /> : <ErrorIcon />}
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${type === 'success' ? 'text-success' : 'text-danger'}`}>{title}</h2>
                <p className="text-text-muted mb-6">{message}</p>
                <Button 
                    onClick={onClose} 
                    variant={type === 'success' ? 'primary' : 'danger'} 
                    className="w-full"
                >
                    {t('common.confirm')}
                </Button>
            </div>
        </Modal>
    );
};