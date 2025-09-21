export interface GuessResult {
    guess: number[];
    hits: number;
    fouls: number;
    strikes: number;
}

export type GameMode = 'challenge' | 'practice';
export type GameResult = 'homerun' | 'strikeout' | null;

export type AchievementStatus = 'locked' | 'claimable' | 'claimed';

export interface Achievement {
    id: string;
    icon: string;
    titleKey: string;
    descriptionKey: string;
    status: AchievementStatus;
    reward: number;
}

export interface RankEntry {
    rank: number;
    player: string;
    record: string;
    reward: string;
}

export type Theme = 'light' | 'dark' | 'dusk' | 'sakura';

export type Language = 'en' | 'ko';

export type AuthState = 'loading' | 'unverified' | 'verified'; // Removed 'error' state, will be handled by notification

export interface NotificationState {
    isOpen: boolean;
    type: 'success' | 'error';
    title: string;
    message: string;
    onConfirm?: () => void;
}

export interface LanguageOption {
  code: Language;
  nativeName: string;
  flag: string;
}

export interface Translation {
  [key: string]: string | string[] | Translation;
}

export interface Translations {
  en: Translation;
  ko: Translation;
}