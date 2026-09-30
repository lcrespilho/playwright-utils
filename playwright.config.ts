import { defineConfig, devices } from '@playwright/test'
import { FixturesOptions } from '@lcrespilho/playwright-fixtures'

export default defineConfig<FixturesOptions>({
  testDir: './tests',
  use: {
    trace: 'off',
  },

  reporter: 'list',
  projects: [
    {
      // Para usar esse projeto, utilize `import { test, expect } from '@lcrespilho/playwright-fixtures'`
      // E suba um browser com CDP na porta 9222
      name: 'cdp',
      use: {
        browserType: 'cdp',
        viewport: null,
        deviceScaleFactor: undefined,
      },
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: null,
        deviceScaleFactor: undefined,
      },
    },
  ],
})
