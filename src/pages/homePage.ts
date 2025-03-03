import { Page } from '@playwright/test';
import { MarketConfig } from '../config/markets';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    constructor(page: Page, marketConfig: MarketConfig) {
        super(page, marketConfig);
    }

    /**
     * Navigates to home page
     */
    async goToHome(): Promise<void> {
        await this.navigate('/');
    }

    /**
     * Navigates to shop page
     */
    async goToShop(): Promise<void> {
        await this.navigate('/shop');
    }

    /**
     * Navigates to about page
     */
    async goToAbout(): Promise<void> {
        await this.navigate('/about');
    }

    /**
     * Navigates to product page
     */
    async goToProduct(productType: string, productSlug: string): Promise<void> {
        await this.page.goto(this.getProductUrl(productType, productSlug));
    }

    /**
     * Navigates to cart page
     */
    async goToCart(): Promise<void> {
        await this.page.goto(this.getCartUrl());
    }
}
