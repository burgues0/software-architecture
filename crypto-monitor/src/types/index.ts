export interface CryptoData {
    symbol: string;
    name: string;
    current_price: number;
    price_change_percentage_24h: number;
    last_updated: string;
}

export interface CryptoApiAdapter {
    getCryptoPrice(cryptoId: string): Promise<CryptoData>;
}

export interface AlertStrategy {
    checkAlert(currentPrice: number, previousPrice?: number): AlertResult | null;
    getDescription(): string;
}

export interface AlertResult {
    message: string;
    type: 'threshold' | 'variation';
    timestamp: Date;
}

export interface AppConfig {
    defaultCrypto: string;
    refreshInterval: number;
    thresholdStrategy: {
        buyPrice: number;
        sellPrice: number;
    };
    variationStrategy: {
        percentage: number;
        timeWindow: number;
    };
}

export interface PriceHistory {
    price: number;
    timestamp: Date;
}