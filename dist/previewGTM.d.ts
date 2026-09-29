import type { Page, BrowserContext } from '@playwright/test';
/**
 * Executa uma versão específica do GTM, sem abrir o Tag Assistant.
 * Deve ser utilizada em `test.beforeEach` ou `test`.
 * @example
 * ```typescript
 * test.beforeEach(async ({ context }) => {
 *   await previewGTM(context, 'https://tagassistant.google.com/?authuser=8&hl=en&utm_source=gtm#/?source=TAG_MANAGER&id=GTM-123123&gtm_auth=cDqGMWuJkUq73urprdYOAw&gtm_preview=env-869&cb=8635696129626987');
 * });
 * ```
 */
export declare function previewGTM(pageOrContext: Page | BrowserContext, tagAssistantUrl: string): Promise<void>;
