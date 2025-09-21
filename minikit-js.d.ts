// Type definitions for @worldcoin/minikit-js
// This file describes the shape of the MiniKit library for TypeScript when loaded from a CDN.

declare module '@worldcoin/minikit-js' {
  /**
   * Enum for the verification level required for an action.
   */
  export enum VerificationLevel {
    Orb = 'orb',
    Device = 'device',
  }

  /**
   * Input payload for the `verify` command.
   */
  export interface VerifyCommandInput {
    action: string;
    signal?: string;
    verification_level?: VerificationLevel;
  }

  /**
   * Successful response payload from a `verify` action.
   */
  export interface MiniAppVerifyActionSuccessPayload {
    status: 'success';
    proof: string;
    merkle_root: string;
    nullifier_hash: string;
    verification_level: VerificationLevel;
    version: number;
  }

  /**
   * Error response payload from a `verify` action.
   */
  export interface MiniAppVerifyActionErrorPayload {
    status: 'error';
    code: string; // e.g., 'user_cancelled', 'unexpected_error'
    message: string;
  }

  /**
   * Union type for the full response payload of a `verify` action.
   */
  export type MiniAppVerifyActionPayload = MiniAppVerifyActionSuccessPayload | MiniAppVerifyActionErrorPayload;

  /**
   * Payload received when subscribing to the 'theme' event.
   */
  interface ThemePayload {
      theme: 'light' | 'dark';
  }

  /**
   * The main MiniKit object for interacting with the World App bridge.
   */
  export const MiniKit: {
    /**
     * Checks if the World App bridge is installed and available.
     * @returns {boolean} True if the bridge is installed, false otherwise.
     */
    isInstalled(): boolean;

    /**
     * Contains asynchronous commands that return promises.
     */
    commandsAsync: {
      /**
       * Initiates a verification process (Incognito Action) in World App.
       * @param {VerifyCommandInput} payload The input for the verification command.
       * @returns {Promise<{ finalPayload: MiniAppVerifyActionPayload }>} A promise that resolves with the final payload after the user interacts with the verification drawer.
       */
      verify(payload: VerifyCommandInput): Promise<{ finalPayload: MiniAppVerifyActionPayload }>;
    };

    /**
     * Subscribes to events from the World App.
     * @param {'theme'} event The name of the event to subscribe to.
     * @param {(payload: ThemePayload) => void} callback The function to call when the event is emitted.
     * @returns {() => void} A function to call to unsubscribe from the event.
     */
    subscribe(event: 'theme', callback: (payload: ThemePayload) => void): () => void;
  };
}
