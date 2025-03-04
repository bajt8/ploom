import { test } from '@playwright/test';
import { HomePage } from '../../src/pages/homePage';
import { ShopPage } from '../../src/pages/shopPage';
import { ProductPage } from '../../src/pages/productPage';
import { CartPage } from '../../src/pages/cartPage';
import { markets } from '../../src/config/market-patterns.config';

const testProducts = ['ploom-x-advanced'];

testProducts.forEach(productId => {
    test.describe(`Remove from cart - ${productId}`, () => {
        test(`should remove ${productId} from cart`, async ({ page }, testInfo) => {
            const market = testInfo.project.name;
            
            // Skip test if product doesn't exist for this market
            test.skip(!markets[market].products[productId], 
                `Product ${productId} is not available in ${market} market`);

            const homePage = new HomePage(page, market);
            const shopPage = new ShopPage(page, market);
            const productPage = new ProductPage(page, market);
            const cartPage = new CartPage(page, market);

            // Add product to cart first
            await homePage.navigate('/');
            await homePage.acceptCookies();
            await homePage.confirmAge();
            
            await homePage.goToShop();
            await shopPage.goToProduct(productId);
            await productPage.addToCart();
            await productPage.verifyMiniCartQuantity();
            await productPage.goToCart();
            await cartPage.verifyProductInCart(productId);

            // Remove product from cart
            await cartPage.removeProduct();
            await cartPage.verifyProductNotInCart(productId);
        });
    });
});  