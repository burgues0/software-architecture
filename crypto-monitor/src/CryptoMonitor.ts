import { ConfigManager } from './config/ConfigManager';
import { CoinGeckoAdapter } from './adapters/CoinGeckoAdapter';
import { ThresholdStrategy, VariationStrategy } from './strategies/AlertStrategies';
import { CryptoData, AlertStrategy } from './types';

export class CryptoMonitor {
    private configManager: ConfigManager;
    private apiAdapter: CoinGeckoAdapter;
    private alertStrategies: AlertStrategy[] = [];
    private currentCrypto: string;
    private isRunning: boolean = false;
    private previousPrice: number | undefined;

    constructor() {
        this.configManager = ConfigManager.getInstance();
        this.apiAdapter = new CoinGeckoAdapter();
        this.currentCrypto = this.configManager.getDefaultCrypto();

        this.setupAlertStrategies();
    }

    private setupAlertStrategies(): void {
        const thresholdConfig = this.configManager.getThresholdConfig();
        const variationConfig = this.configManager.getVariationConfig();

        this.alertStrategies = [
            new ThresholdStrategy(thresholdConfig.buyPrice, thresholdConfig.sellPrice),
            new VariationStrategy(variationConfig.percentage, variationConfig.timeWindow)
        ];
    }

    async start(): Promise<void> {
        this.isRunning = true;
        this.showWelcome();
        
        while (this.isRunning) {
            await this.monitorPrice();
            await this.sleep(this.configManager.getRefreshInterval());
        }
    }

    private showWelcome(): void {
        console.clear();
        console.log('=== CRYPTO-MONITOR ===');
        console.log(`Moeda atual: ${this.currentCrypto.toUpperCase()}`);
        console.log(`Intervalo: ${this.configManager.getRefreshInterval() / 1000}s`);
        console.log('');
        
        console.log('Estratégias de Alerta Ativas:');
        this.alertStrategies.forEach((strategy, index) => {
            console.log(`  ${index + 1}. ${strategy.getDescription()}`);
        });
        
        console.log('');
        console.log('Comandos disponíveis:');
        console.log('  - Digite o nome de uma moeda para trocar (bitcoin, ethereum, solana)');
        console.log('  - Digite "sair" para encerrar');
        console.log('  - Digite "config" para ver configurações');
        console.log('');
        console.log('═'.repeat(60));
        console.log('');
    }

    private async monitorPrice(): Promise<void> {
        try {
            const cryptoData = await this.apiAdapter.getCryptoPrice(this.currentCrypto);
            this.displayPrice(cryptoData);
            this.checkAlerts(cryptoData.current_price);
            this.previousPrice = cryptoData.current_price;
            
        } catch (error) {
            console.error(`Erro ao buscar preço: ${error}`);
        }
    }

    private displayPrice(data: CryptoData): void {
        const timestamp = new Date().toLocaleTimeString('pt-BR');
        const priceChange = data.price_change_percentage_24h;
        const changeIcon = priceChange >= 0 ? '++' : '--';
        const changeColor = priceChange >= 0 ? '\x1b[32m' : '\x1b[31m';
        const resetColor = '\x1b[0m';
        
        console.log(`[${timestamp}] ${data.name} (${data.symbol.toUpperCase()})`);
        console.log(`Preço: $${data.current_price.toFixed(2)}`);
        console.log(`${changeIcon} 24h: ${changeColor}${priceChange >= 0 ? '+' : ''}${priceChange.toFixed(2)}%${resetColor}`);
        console.log('─'.repeat(40));
    }

    private checkAlerts(currentPrice: number): void {
        this.alertStrategies.forEach(strategy => {
            const alert = strategy.checkAlert(currentPrice, this.previousPrice);
            if (alert) {
                console.log('');
                console.log('!! ' + '='.repeat(50));
                console.log(alert.message);
                console.log(`${alert.timestamp.toLocaleString('pt-BR')}`);
                console.log('!! ' + '='.repeat(50));
                console.log('');
            }
        });
    }

    public changeCrypto(newCrypto: string): void {
        const supportedCryptos = this.apiAdapter.getSupportedCryptos();
        
        if (!supportedCryptos.includes(newCrypto.toLowerCase())) {
            console.log(`Moeda "${newCrypto}" não suportada.`);
            console.log(`Moedas disponíveis: ${supportedCryptos.join(', ')}`);
            return;
        }

        this.currentCrypto = newCrypto.toLowerCase();
        this.previousPrice = undefined;

        this.alertStrategies.forEach(strategy => {
            if (strategy instanceof VariationStrategy) {
                strategy.clearHistory();
            }
        });
        
        console.log(`✅ Monitorando agora: ${this.currentCrypto.toUpperCase()}`);
        console.log('');
    }

    public showConfig(): void {
        const config = this.configManager.getConfig();
        console.log('=== CONFIGURAÇÕES ATUAIS ===');
        console.log(`Moeda padrão: ${config.defaultCrypto}`);
        console.log(`Intervalo: ${config.refreshInterval}s`);
        console.log(`Threshold - Compra: $${config.thresholdStrategy.buyPrice} | Venda: $${config.thresholdStrategy.sellPrice}`);
        console.log(`Variação: ${config.variationStrategy.percentage}% em ${config.variationStrategy.timeWindow}min`);
        console.log('');
    }

    public stop(): void {
        this.isRunning = false;
        console.log('Monitor encerrado. Até logo!');
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}