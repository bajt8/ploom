import { test, expect } from '@playwright/test';
import { MarketConfig } from '../../src/config/markets';
import { MarketPattern } from '../../src/types/market-types';
import { routes } from '../../src/config/routes.config';
import { markets } from '../../src/config/market-patterns.config';
import { HomePage } from '../../src/pages/homePage';

/**
 * Smoke tests for verifying market-specific URL validation
 *
 * Run all market tests:
 * ```bash
 * npx playwright test
 * ```
 *
 * Run tests for a specific market:
 * ```bash
 * npx playwright test --project=uk
 * npx playwright test --project=pl
 * ```
 *
 * Run with debug mode:
 * ```bash
 * npx playwright test --debug
 * ```
 *
 * Run with a headed browser:
 * ```bash
 * npx playwright test --headed
 * ```
 */

test.describe('Market URL Validation Tests', () => {
    let marketConfig: MarketConfig;
    let market: string;
    let patterns: MarketPattern;
    let homePage: HomePage;

    test.beforeEach(async ({ page }, testInfo) => {
        market = testInfo.project.name;
        marketConfig = testInfo.project.use.marketConfig as MarketConfig;
        patterns = markets[market];
        homePage = new HomePage(page, market);
        
        // Skip test if market configuration is missing
        test.skip(!patterns, `No configuration defined for market: ${market}`);
    });

    test('verify market configuration', async () => {
        expect(marketConfig.baseURL).toContain(patterns.domain);
        expect(marketConfig.baseURL).toContain(patterns.language);
    });

    test.describe('Route Handling Checks', () => {
        for (const { path } of routes) {
            test(`should correctly handle ${path} route`, async ({ page }) => {
                await test.step(`navigate to ${path}`, async () => {
                    await homePage.navigate(path);
                });

                await test.step('verify URL structure', async () => {
                    const expectedUrl = homePage.getExpectedUrl(path);
                    const currentUrl = await homePage.getCurrentUrl();
                    await expect(page).toHaveURL(expectedUrl);
                });

                await test.step('verify market-specific URL components', async () => {
                    const currentUrl = await homePage.getCurrentUrl();
                    expect(currentUrl).toContain(patterns.domain);
                    expect(currentUrl).toContain(patterns.language);
                });
            });
        }
    });
});
