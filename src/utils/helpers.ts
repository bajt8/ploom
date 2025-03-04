import { Page } from '@playwright/test';

interface ImageStatus {
    complete: boolean;
    naturalWidth: number;
    naturalHeight: number;
}

/**
 * Verifies if product images are properly loaded and displayed
 * Checks only images within product-details container
 * @param page - Playwright page object
 * @throws Error if any product images are broken
 */
export async function verifyBrokenImage(page: Page) {
    // Get all images from product details section
    const productImages = await page.$$('[data-testid="product-details"] img');
    const brokenImages: string[] = [];

    for (const img of productImages) {
        try {
            // Skip invisible images
            const isVisible = await img.isVisible();
            if (!isVisible) continue;

            // Check image loading status and dimensions
            const imageStatus = await img.evaluate((el: HTMLImageElement) => {
                return new Promise<ImageStatus>((resolve) => {
                    if (el.complete) {
                        resolve({
                            complete: el.complete,
                            naturalWidth: el.naturalWidth,
                            naturalHeight: el.naturalHeight
                        });
                    } else {
                        // Handle async image loading
                        el.onload = () => resolve({
                            complete: true,
                            naturalWidth: el.naturalWidth,
                            naturalHeight: el.naturalHeight
                        });
                        el.onerror = () => resolve({
                            complete: false,
                            naturalWidth: 0,
                            naturalHeight: 0
                        });
                    }
                });
            });

            // Consider image broken if not complete or has zero dimensions
            if (!imageStatus.complete || (imageStatus.naturalWidth === 0 && imageStatus.naturalHeight === 0)) {
                const src = await img.getAttribute('src') || 'unknown source';
                brokenImages.push(src);
            }
        } catch (error) {
            const src = await img.getAttribute('src') || 'unknown source';
            brokenImages.push(`${src} (Error: ${error.message})`);
        }
    }

    if (brokenImages.length > 0) {
        throw new Error(`Found ${brokenImages.length} broken product images:\n${brokenImages.join('\n')}`);
    }
}

/**
 * Verifies if all links on the page are valid and accessible
 * Skips special links like tel:, mailto:, anchors (#)
 * @param page - Playwright page object
 * @throws Error if any links are broken or inaccessible
 */
export async function verifyBrokenLink(page: Page) {
    // Get all links from the page
    const links = await page.$$('a');
    const brokenLinks: string[] = [];

    for (const link of links) {
        const href = await link.getAttribute('href');
        // Skip empty and special protocol links
        if (!href || 
            href.startsWith('#') || 
            href === '' || 
            href.startsWith('tel:') || 
            href.startsWith('mailto:')) continue;

        try {
            // Check if link is accessible
            const response = await page.request.head(href).catch(() => null);
            if (!response || response.status() >= 400) {
                brokenLinks.push(href);
            }
        } catch (error) {
            brokenLinks.push(`${href} (Error: ${error.message})`);
        }
    }

    if (brokenLinks.length > 0) {
        throw new Error(`Found ${brokenLinks.length} broken links:\n${brokenLinks.join('\n')}`);
    }
} 
