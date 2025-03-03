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
};

export type Markets = {
    [market: string]: MarketPattern;
}; 