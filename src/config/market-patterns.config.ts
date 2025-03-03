import { Markets } from '../types/market-types';

export const markets: Markets = {
    uk: {
        domain: 'ploom.co.uk',
        language: 'en',
        routes: {
            shop: 'shop',
            about: 'about-ploom',
            cart: 'cart-n-checkout'
        },
        productPath: 'products',
        devicePath: 'devices'
    },
    pl: {
        domain: 'ploom.pl',
        language: 'pl',
        routes: {
            shop: 'sklep',
            about: 'dlaczego-ploom',
            cart: 'cart'
        },
        productPath: 'produkty',
        devicePath: 'urzadzenie'
    }
    // Adding new market is as simple as adding a new entry here
    // de: {
    //     domain: 'ploom.de',
    //     language: '/de'
    // }
}; 