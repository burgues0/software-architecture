import { Product, IProductProvider } from '../types';
import { readFileSync } from 'fs';

export class JsonAdapter implements IProductProvider {
    constructor(private filePath: string) {}

    async load(): Promise<Product[]> {
        const content = readFileSync(this.filePath, 'utf-8');
        const data = JSON.parse(content);
        
        return Array.isArray(data) ? data.map(this.mapToProduct) : [this.mapToProduct(data)];
    }

    private mapToProduct(item: any): Product {
        return {
            id: item.id || item.ID || item.productId || '',
            name: item.name || item.productName || item.title || '',
            price: parseFloat(item.price || item.cost || item.value || 0)
        };
    }
}