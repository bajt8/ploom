import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class CartPage extends BasePage {
    constructor(page: Page, market: string) {
        super(page, market);
    }

    async verifyProductInCart(productId: string): Promise<void> {
        const cartList = this.page.getByTestId('regular-cart-list');
        const baseProductName = this.marketPattern.products[productId].baseProductName;
        
        await expect(
            cartList.locator('a').filter({ hasText: new RegExp(baseProductName, 'i') })
        ).toBeVisible();
    }

    async removeProduct(): Promise<void> {
        await this.page.getByTestId('regular-cart-list').getByTestId('cartRemoveButton').click();
        await this.page.getByTestId('remove-item-submit-button').click();
    }

    async verifyProductNotInCart(productId: string): Promise<void> {
        const cartList = this.page.getByTestId('regular-cart-list');
        const baseProductName = this.marketPattern.products[productId].baseProductName;
        
        await expect(
            cartList.locator('a').filter({ hasText: new RegExp(baseProductName, 'i') })
        ).not.toBeVisible();
    }
} 

