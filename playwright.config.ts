import { defineConfig, devices } from '@playwright/test';
import { config as alphaConfig } from './config/config.alpha';
import { config as productionConfig } from './config/config.production';

/**
 * Use process.env to manage secrets/variables if needed.
 */
const env = process.env.NODE_ENV || 'alpha';
const envConfig = env === 'production' ? productionConfig : alphaConfig;

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'never' }]],
  
  /* Shared settings for all the projects below. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    // Emulate a real desktop browser to avoid 403s
    // Removing custom User-Agent to see if Playwright's default works better with ReqRes
    // userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    extraHTTPHeaders: {
      'Content-Type': 'application/json'
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      // Always run headless in CI, otherwise respect the config
      use: { ...devices['Desktop Chrome'], headless: process.env.CI ? true : envConfig.headless },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
