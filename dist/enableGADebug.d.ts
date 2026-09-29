import type { BrowserContext } from '@playwright/test';
/**
 * Simula a extensão Google Analytics Debugger (https://chrome.google.com/webstore/detail/jnkmfdileelhofjcijamephohjechhna),
 * habilitando debug GA4 (gtag).
 */
export declare function enableGADebug(context: BrowserContext): Promise<void>;
