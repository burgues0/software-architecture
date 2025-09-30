import { AlertStrategy, AlertResult, PriceHistory } from '../types';

export class ThresholdStrategy implements AlertStrategy {
    private buyPrice: number;
    private sellPrice: number;

    constructor(buyPrice: number, sellPrice: number) {
        this.buyPrice = buyPrice;
        this.sellPrice = sellPrice;
    }

    checkAlert(currentPrice: number): AlertResult | null {
        if (currentPrice <= this.buyPrice) {
            return {
                message: `ALERTA DE COMPRA! Preço atual: $${currentPrice.toFixed(2)} (limite: $${this.buyPrice})`,
                type: 'threshold',
                timestamp: new Date()
            };
        }

        if (currentPrice >= this.sellPrice) {
            return {
                message: `ALERTA DE VENDA! Preço atual: $${currentPrice.toFixed(2)} (limite: $${this.sellPrice})`,
                type: 'threshold',
                timestamp: new Date()
            };
        }

        return null;
    }

    getDescription(): string {
        return `Threshold Strategy - Compra: $${this.buyPrice} | Venda: $${this.sellPrice}`;
    }
}

export class VariationStrategy implements AlertStrategy {
    private percentage: number;
    private timeWindow: number;
    private priceHistory: PriceHistory[] = [];

    constructor(percentage: number, timeWindow: number) {
        this.percentage = percentage;
        this.timeWindow = timeWindow;
    }

    checkAlert(currentPrice: number, previousPrice?: number): AlertResult | null {
        this.priceHistory.push({
            price: currentPrice,
            timestamp: new Date()
        });

        const cutoffTime = new Date(Date.now() - this.timeWindow * 60 * 1000);
        this.priceHistory = this.priceHistory.filter(
            entry => entry.timestamp >= cutoffTime
        );

        if (this.priceHistory.length < 2) {
            return null;
        }

        const oldestPrice = this.priceHistory[0].price;
        const variation = ((currentPrice - oldestPrice) / oldestPrice) * 100;
        const absVariation = Math.abs(variation);

        if (absVariation >= this.percentage) {
            const direction = variation > 0 ? 'SUBIU' : 'CAIU';
            return {
                message: `VARIAÇÃO ALTA! ${direction} ${absVariation.toFixed(2)}% em ${this.timeWindow}min (de $${oldestPrice.toFixed(2)} para $${currentPrice.toFixed(2)})`,
                type: 'variation',
                timestamp: new Date()
            };
        }

        return null;
    }

    getDescription(): string {
        return `Variation Strategy - ${this.percentage}% em ${this.timeWindow} minutos`;
    }

    clearHistory(): void {
        this.priceHistory = [];
    }
}