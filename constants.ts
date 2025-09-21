
export const SECRET_CODE_LENGTH = 3;
export const MAX_GUESSES = 9;
export const HINT_COST = 1; // Cost in WGT
export const MAX_HINTS = 3;
export const CHALLENGE_MODE_COST = 1;

// This is the **Identifier** from your Incognito Action in the Worldcoin Developer Portal
// It must match exactly what is in the portal.
export const WORLD_ID_ACTION_IDENTIFIER = 'wgt-baseball-login'; 

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