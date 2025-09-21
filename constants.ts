
export const SECRET_CODE_LENGTH = 3;
export const MAX_GUESSES = 9;
export const HINT_COST = 1; // Cost in WGT
export const MAX_HINTS = 3;
export const CHALLENGE_MODE_COST = 1;

// TODO: Replace with your actual App ID from the Worldcoin Developer Portal (Configuration > Basic)
export const WORLDCOIN_APP_ID = 'app_e5836672d01fa0d046230bcd43756305'; 

// Rewards for Challenge Mode based on inning of success
export const DAILY_CHALLENGE_WGT_REWARDS = [
    100,    // 1st inning
    50,     // 2nd
    10,     // 3rd
    5,      // 4th
    2,      // 5th
    0.8,    // 6th
    0.5,    // 7th
    0.2,    // 8th
    0.1,    // 9th
];