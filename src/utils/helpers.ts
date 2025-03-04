import { Page } from '@playwright/test';

export async function checkImages(page: Page) {
    const images = await page.$$('img');

    for (const img of images) {
        const isVisible = await img.isVisible();
        if (!isVisible) continue;

        const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
        if (naturalWidth === 0) {
            const src = await img.getAttribute('src');
            throw new Error(`Broken image: ${src}`);
        }
    }
}
