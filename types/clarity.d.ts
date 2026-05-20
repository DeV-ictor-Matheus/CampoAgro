type ClarityConsentCommand = 'consent';
type ClarityEventCommand = 'event';
type ClaritySetCommand = 'set';
type ClarityIdentifyCommand = 'identify';

type ClarityFunction = {
  (command: ClarityConsentCommand, value: boolean): void;
  (command: ClarityEventCommand, name: string): void;
  (command: ClaritySetCommand, key: string, value: string): void;
  (command: ClarityIdentifyCommand, userId: string, sessionId?: string, pageId?: string, friendlyName?: string): void;
  q?: unknown[];
};

declare global {
  interface Window {
    clarity: ClarityFunction;
    // Abre o banner de preferências de cookies a partir do rodapé
    __campoagroOpenCookiePrefs?: () => void;
  }
}

export {};
