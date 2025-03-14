import { defineConfig, devices } from '@playwright/test';
import { markets, MarketConfig } from './src/config/markets';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

declare module '@playwright/test' {
  interface TestOptions {
    marketConfig: MarketConfig;
  }

  interface PlaywrightTestOptions {
    marketConfig: MarketConfig;
  }
}

const marketProjects = Object.entries(markets).map(([name, config]) => ({
    name,
    use: {
        ...devices['Desktop Chrome'],
        baseURL: config.baseURL,
        marketConfig: config,
        launchOptions: {
            slowMo: 700,
        },
    },
}));

/**
 * See https://playwright.dev/docs/test-configuration.
 */
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
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    navigationTimeout: 50000,
    actionTimeout: 50000,
  },
  timeout: 60 * 1000,
  expect: {
    timeout: 50000,
  },
  /* Configure projects for major browsers */
  projects: marketProjects,

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
