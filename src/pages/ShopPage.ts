import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ShopPage extends BasePage {
    constructor(page: Page, market: string) {
        super(page, market);
    }

    /**
     * Navigates to product page
     */
    async goToProduct(productId: string): Promise<void> {
        const productUrl = this.marketPattern.products[productId].url;
        await this.navigate(productUrl);
    }
}
