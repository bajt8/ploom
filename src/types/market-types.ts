export type Route = {
    name: string;
    path: string;
    subRoutes?: {
        [key: string]: string;
    };
};

export type MarketPattern = {
    domain: string;
    language: string;
    routes: {
        [key: string]: string;
    };
    productPath: string;
    devicePath: string;
    testIds: {
        shopLink: string;
        confirmAgeText: string;
    };
    products: {
        [key: string]: {
            sku: string;
            selector: string;
            url: string;
            baseProductName: string;
        };
    };
    cartItemText: {
        single: string;
    };
};

export type Markets = {
    [market: string]: MarketPattern;
};