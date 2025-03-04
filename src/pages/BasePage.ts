import { Page } from '@playwright/test';
import { markets } from '../config/market-patterns.config';
import { MarketPattern } from '../types/market-types';

export class BasePage {
    protected market: string;
    protected marketPattern: MarketPattern;
    
    constructor(protected page: Page, market: string) {
        this.market = market;
        this.marketPattern = markets[this.market];

        if (!this.marketPattern) {
            throw new Error(`Market pattern not found for market: ${market}`);
        }

        this.setupErrorHandling();
    }

    /**
     * Sets up error handling for navigation responses
     * Catches 404s and other HTTP errors for main document requests
     */
    private setupErrorHandling(): void {
        this.page.on('response', async response => {
            const isMainNavigation = response.request().resourceType() === 'document';
            if (isMainNavigation) {
                if (response.status() === 404) {
                    throw new Error(`Page not found: ${response.url()}`);
                }
                if (response.status() >= 400) {
                    throw new Error(`Navigation failed with status ${response.status()}: ${response.url()}`);
                }
            }
        });
    }

    /**
     * Builds a full URL with optional additional paths
     */
    private buildFullUrl(...paths: string[]): string {
        const baseUrl = `https://www.${this.marketPattern.domain}`;
        
        const allPaths = [
            this.marketPattern.language,
            ...paths
        ];
        
        const cleanPaths = allPaths
            .filter(Boolean)
            .map(path => path.replace(/^\/+/, ''))
            .join('/');
        
        const cleanBaseUrl = baseUrl.replace(/\/+$/, '');
        const finalPath = cleanPaths ? `/${cleanPaths}` : '';
        
        return `${cleanBaseUrl}${finalPath}`;
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
     * Navigates to a specific path with error handling
     */
    async navigate(path: string): Promise<void> {
        try {
            const response = await this.page.goto(this.getMarketUrl(path));
            
            if (!response?.ok()) {
                throw new Error(`Navigation failed with status ${response?.status()}: ${response?.url()}`);
            }

            await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {

                console.warn('Network idle timeout - continuing test');
            });
        } catch (error) {
            if (error.message.includes('Network idle timeout')) {
                return;
            }
            throw new Error(`Failed to navigate to ${path}: ${error.message}`);
        }
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