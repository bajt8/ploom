import { test } from '@playwright/test';
import { HomePage } from '../../src/pages/homePage';
import { ShopPage } from '../../src/pages/shopPage';
import { markets } from '../../src/config/market-patterns.config';
import { verifyBrokenLink, verifyBrokenImage } from '../../src/utils/helpers';

const testProducts = ['ploom-x-advanced'];

testProducts.forEach(productId => {
    test.describe(`Verify product page resources`, () => {
        /**
         * Common setup for both tests
         * Navigates to product page through homepage and shop
         * @param page - Playwright page object
         * @param market - Market identifier
         */
        async function setupTest({ page }, market: string) {
            const homePage = new HomePage(page, market);
            const shopPage = new ShopPage(page, market);

            await homePage.navigate('/');
            await homePage.acceptCookies();
            await homePage.confirmAge();
            await homePage.goToShop();
            await shopPage.goToProduct(productId);
        }

        test(`should not have any broken links on the product page`, async ({ page }, testInfo) => {
            test.setTimeout(120000);
            const market = testInfo.project.name;
            
            // Skip test if product is not available in current market
            test.skip(!markets[market].products[productId], 
                `Product ${productId} is not available in ${market} market`);

            await setupTest({ page }, market);
            await verifyBrokenLink(page);
        });

        test(`should not have any broken images on the product page`, async ({ page }, testInfo) => {
            test.setTimeout(120000);
            const market = testInfo.project.name;
            
            // Skip test if product is not available in current market
            test.skip(!markets[market].products[productId], 
                `Product ${productId} is not available in ${market} market`);

            await setupTest({ page }, market);
            await verifyBrokenImage(page);
        });
    });
});  