export type Route = {
    path: string;
    expectedPath: string;
};

export type MarketPattern = {
    domain: string;
    language: string;
};

export type MarketPatterns = Record<string, MarketPattern>; 