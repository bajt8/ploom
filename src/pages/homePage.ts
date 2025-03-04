import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { markets } from '../config/market-patterns.config';

export class HomePage extends BasePage {
    constructor(page: Page, market: string) {
        super(page, market);
    }

    // Locators
    private readonly acceptCookiesButton = '#onetrust-accept-btn-handler';

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
        const shopLinkTestId = markets[this.market].testIds.shopLink;
        await this.page.click(`[data-testid="${shopLinkTestId}"]`);
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

    async acceptCookies() {
        await this.page.click(this.acceptCookiesButton);
    }

    async confirmAge() {
        const confirmText = markets[this.market].testIds.confirmAgeText;
        await this.page.click(`text=${confirmText}`);
    }
}
