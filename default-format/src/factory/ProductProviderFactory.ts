import { IProductProvider } from '../types';
import { JsonAdapter } from '../adapters/JsonAdapter';
import { CsvAdapter } from '../adapters/CsvAdapter';
import { XmlAdapter } from '../adapters/XmlAdapter';

export class ProductProviderFactory {
    private static instance: ProductProviderFactory;

    private constructor() {}

    public static getInstance(): ProductProviderFactory {
        if (!ProductProviderFactory.instance) {
            ProductProviderFactory.instance = new ProductProviderFactory();
        }
        return ProductProviderFactory.instance;
    }

    public createProvider(format: string, filePath: string): IProductProvider {
        switch (format.toLowerCase()) {
            case 'json':
                return new JsonAdapter(filePath);
            case 'csv':
                return new CsvAdapter(filePath);
            case 'xml':
                return new XmlAdapter(filePath);
            default:
                throw new Error(`Formato não suportado: ${format}`);
        }
    }
}