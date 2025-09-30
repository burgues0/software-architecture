import * as fs from 'fs';
import * as path from 'path';
import { AppConfig } from '../types';

export class ConfigManager {
    private static instance: ConfigManager;
    private config!: AppConfig;

    private constructor() {
        this.loadConfig();
    }

    public static getInstance(): ConfigManager {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }

    private loadConfig(): void {
        try {
            const configPath = path.join(process.cwd(), 'config.json');
            const configFile = fs.readFileSync(configPath, 'utf8');
            this.config = JSON.parse(configFile);
            console.log('Configuração carregada com sucesso');
        } catch (error) {
            console.error('Erro ao carregar configuração, usando valores padrão');
            this.config = this.getDefaultConfig();
        }
    }

    private getDefaultConfig(): AppConfig {
        return {
            defaultCrypto: 'bitcoin',
            refreshInterval: 30,
            thresholdStrategy: {
                buyPrice: 50000,
                sellPrice: 70000
            },
            variationStrategy: {
                percentage: 5,
                timeWindow: 15
            }
        };
    }

    public getConfig(): AppConfig {
        return this.config;
    }

    public getDefaultCrypto(): string {
        return this.config.defaultCrypto;
    }

    public getRefreshInterval(): number {
        return this.config.refreshInterval * 1000;
    }

    public getThresholdConfig() {
        return this.config.thresholdStrategy;
    }

    public getVariationConfig() {
        return this.config.variationStrategy;
    }
}