// tests/testCases/testCase1.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/homePage';
import { ShopPage } from '../../src/pages/shopPage';
import { ProductPage } from '../../src/pages/productPage';
import { CartPage } from '../../src/pages/cartPage';
import { markets } from '../../src/config/market-patterns.config';

const testProducts = ['ploom-x-advanced', 'ploom-x-pro'];

testProducts.forEach(productId => {
    test.describe(`Add to cart - ${productId}`, () => {
        test(`should add ${productId} to cart`, async ({ page }, testInfo) => {
            const market = testInfo.project.name;
            
            test.skip(!markets[market].products[productId], 
                `Product ${productId} is not available in ${market} market`);

            const homePage = new HomePage(page, market);
            const shopPage = new ShopPage(page, market);
            const productPage = new ProductPage(page, market);
            const cartPage = new CartPage(page, market);

            await homePage.navigate('/');
            await homePage.acceptCookies();
            await homePage.confirmAge();
            
            await homePage.goToShop();
            await shopPage.goToProduct(productId);
            await productPage.addToCart();
            await productPage.verifyMiniCartQuantity();
            await productPage.goToCart();
            await cartPage.verifyProductInCart(productId);
        });
    });
});