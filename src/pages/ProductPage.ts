import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class ProductPage extends BasePage {
    constructor(page: Page, market: string) {
        super(page, market);
    }

    
    /**
     * Navigates to cart page
     */
    async goToCart(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
        try {
            await this.page.getByTestId('miniCartCheckoutButton').click();
        } catch {
            await this.navigate(this.marketPattern.routes.cart);
        }
    }

    /**
     * Adds current product to cart
     */
    async addToCart(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
        await this.toggleHeader(false);
        
        const addToCartButton = this.page.getByTestId('pdpAddToProduct');
        await addToCartButton.waitFor({ state: 'visible' });
        await addToCartButton.click();
        
        await this.toggleHeader(true);
    }

    private async toggleHeader(show: boolean): Promise<void> {
        await this.page.evaluate((visible) => {
            const header = document.querySelector('header');
            if (header) header.style.display = visible ? '' : 'none';
        }, show);
    }

    /**
     * Verifies if product was added to cart
     */
    async verifyMiniCartQuantity(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
        const cartHeader = this.page.getByTestId('mini-cart-header');
        await expect(cartHeader).toBeVisible();
        await expect(cartHeader).toContainText(this.marketPattern.cartItemText.single);
    }
}
