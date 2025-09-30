import { CryptoApiAdapter, CryptoData } from '../types';
import * as https from 'https';

try {
    require('dotenv').config();
} catch {
    // dotenv não disponível, tratar depois
}

export class CoinGeckoAdapter implements CryptoApiAdapter {
    private baseUrl: string;
    private apiKey: string | undefined;

    constructor() {
        this.apiKey = process.env.COINGECKO_API_KEY;
        this.baseUrl = this.apiKey ? 'https://pro-api.coingecko.com/api/v3' : 'https://api.coingecko.com/api/v3';
    }

    async getCryptoPrice(cryptoId: string): Promise<CryptoData> {
        try {
            const response = await this.makeApiCall(cryptoId);
            
            if (!response || !response[0]) {
                throw new Error('Resposta inválida da API');
            }

            const coinData = response[0];
            
            return {
                symbol: coinData.symbol,
                name: coinData.name,
                current_price: coinData.current_price,
                price_change_percentage_24h: coinData.price_change_percentage_24h,
                last_updated: coinData.last_updated
            };
        } catch (error) {
            throw new Error(`Erro ao buscar dados para ${cryptoId}: ${error}`);
        }
    }

    private async makeApiCall(cryptoId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const endpoint = `/coins/markets?vs_currency=usd&ids=${cryptoId}&order=market_cap_desc&per_page=1&page=1`;
            const apiKeyParam = this.apiKey ? 
                (this.baseUrl.includes('pro-api') ? 'x_cg_pro_api_key' : 'x_cg_demo_api_key') : '';
            
            const url = this.apiKey ? 
                `${this.baseUrl}${endpoint}&${apiKeyParam}=${this.apiKey}` : 
                `${this.baseUrl}${endpoint}`;

            https.get(url, (res) => {
                let data = '';
                
                res.on('data', (chunk) => {
                    data += chunk;
                });
                
                res.on('end', () => {
                    try {
                        const jsonData = JSON.parse(data);
                        resolve(jsonData);
                    } catch (error) {
                        reject(new Error('Erro ao parsear resposta da API'));
                    }
                });
            }).on('error', (error) => {
                reject(error);
            });
        });
    }

    getSupportedCryptos(): string[] {
        return ['bitcoin', 'ethereum', 'solana', 'cardano', 'polkadot', 'chainlink'];
    }
}