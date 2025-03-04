export interface MarketConfig {
  baseURL: string;
}

export const markets: Record<string, MarketConfig> = {
  uk: {
      baseURL: 'https://www.ploom.co.uk/en',
  },
  pl: {
      baseURL: 'https://www.ploom.pl/pl',
  },
  // de: {
  //     baseURL: 'https://www.ploom.de/de',
  // },
};