import { Markets } from '../types/market-types';

export const markets: Markets = {
    uk: {
        domain: 'ploom.co.uk',
        language: 'en',
        routes: {
            shop: 'shop',
            about: 'about-ploom',
            cart: 'cart-n-checkout#/'
        },
        productPath: 'products',
        devicePath: 'devices',
        testIds: {
            shopLink: 'headerItem-0',
            confirmAgeText: 'Yes, discover more'
        },
        products: {
            'ploom-x-advanced': {
                sku: 'ploom-x-advanced',
                selector: '[data-sku="ploom-x-advanced"]',
                url: '/shop/products/devices/ploom-x-advanced',
                baseProductName: 'Ploom X Advanced'
            }
        },
        cartItemText: {
            single: '1 Item'
        }
    },
    pl: {
        domain: 'ploom.pl',
        language: 'pl',
        routes: {
            shop: 'sklep',
            about: 'dlaczego-ploom',
            cart: 'cart#/'
        },
        productPath: 'produkty',
        devicePath: 'urzadzenie',
        testIds: {
            shopLink: 'headerItem-1',
            confirmAgeText: 'Potwierdź'
        },
        products: {
            'ploom-x-advanced': {
                sku: '15109183',
                selector: '[data-sku="15109183"]',
                url: '/sklep/produkty/urzadzenie/ploom-x-advanced-czarny',
                baseProductName: 'Ploom X Advanced'
            },
            // This commented out product serves as an example:
            // 1. Demonstrates how easily new products can be added to market configuration
            // 2. Shows error handling mechanism - tests handle missing products through
            //    URL error handling in BasePage (see: setupErrorHandling method)
            // 3. Illustrates architecture flexibility - new products can be added
            //    without modifying test logic

            // 'ploom-x-pro': {
            //     sku: '15109184',
            //     selector: '[data-sku="15109184"]',
            //     url: '/sklep/produkty/urzadzenie/ploom-x-pro-czarny',
            //     baseProductName: 'Ploom X Pro'
            // }
        },
        cartItemText: {
            single: '1 produkt'
        }
    },
    // Example of adding new market configuration:
    // 1. Shows how easily new markets can be added to the configuration
    // 2. Demonstrates consistent structure across all markets
    // 3. Illustrates flexible routing system with market-specific paths
    // 4. Remember to also add corresponding market entry in @markets.ts file
    //    with appropriate baseURL configuration
    // de: {
    //     domain: 'ploom.de',
    //     language: '/de',
    //     routes: {
    //         shop: 'shop',
    //         about: 'about-ploom',
    //         cart: 'cart-n-checkout#/'
    //     },
    //     productPath: 'products',
    //     devicePath: 'devices',
    //     testIds: {
    //         shopLink: 'headerItem-2',
    //         confirmAgeText: 'Bestätigen'
    //     },
    //     products: {
    //         'ploom-x-advanced': {
    //             sku: 'ploom-x-advanced',
    //             selector: '[data-sku="ploom-x-advanced"]',
    //             url: '/shop/products/devices/ploom-x-advanced',
    //             baseProductName: 'Ploom X Advanced'
    //         }
    //     },
    //     cartItemText: {
    //         single: '1 Item'
    //     }
    // }
}; 