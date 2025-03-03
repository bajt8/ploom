import { Page } from '@playwright/test';
import { MarketConfig } from '../config/markets';
import { markets } from '../config/market-patterns.config';
import { MarketPattern } from '../types/market-types';

export class BasePage {
    protected market: string;
    protected marketPattern: MarketPattern;
    
    constructor(protected page: Page, protected marketConfig: MarketConfig) {
        this.market = Object.keys(markets).find(
            market => marketConfig.baseURL.includes(markets[market].domain)
        ) || 'uk';
        this.marketPattern = markets[this.market];
    }

    /**
     * Builds a full URL with optional additional paths
     */
    private buildFullUrl(...paths: string[]): string {
        // Check if baseURL already contains the language prefix
        const baseUrlWithLang = this.marketConfig.baseURL.includes(`/${this.marketPattern.language}`)
            ? this.marketConfig.baseURL
            : `${this.marketConfig.baseURL}/${this.marketPattern.language}`;

        // Join base URL with additional paths
        return [baseUrlWithLang, ...paths].filter(Boolean).join('/');
    }

    /**
     * Converts a generic path to a market-specific URL
     */
    protected getMarketUrl(path: string): string {
        // Remove leading slash for consistency
        const cleanPath = path.replace(/^\//, '');

        // Handle home page
        if (cleanPath === '') {
            return this.buildFullUrl();
        }

        // Get market-specific route
        const marketRoute = this.marketPattern.routes[cleanPath] || cleanPath;

        // Build full URL
        return this.buildFullUrl(marketRoute);
    }

    /**
     * Navigates to a specific path
     */
    async navigate(path: string): Promise<void> {
        await this.page.goto(this.getMarketUrl(path));
    }

    /**
     * Gets current page URL
     */
    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    /**
     * Gets expected URL for a given path
     */
    getExpectedUrl(expectedPath: string): string {
        return this.getMarketUrl(expectedPath);
    }

    /**
     * Gets product URL
     */
    protected getProductUrl(productType: string, productSlug: string): string {
        const { productPath, devicePath } = this.marketPattern;
        const path = productType === 'device' ? devicePath : productType;
        return this.buildFullUrl(productPath, path, productSlug);
    }

    /**
     * Gets cart URL
     */
    protected getCartUrl(): string {
        return this.buildFullUrl(this.marketPattern.routes.cart);
    }
} 