import { Product, IProductProvider } from '../types';
import { createReadStream } from 'fs';
import csvParser from 'csv-parser';

export class CsvAdapter implements IProductProvider {
    constructor(private filePath: string) {}

    async load(): Promise<Product[]> {
        return new Promise((resolve, reject) => {
            const products: Product[] = [];
            
            createReadStream(this.filePath)
                .pipe(csvParser())
                .on('data', (row: any) => {
                    products.push(this.mapToProduct(row));
                })
                .on('end', () => {
                    resolve(products);
                })
                .on('error', (error: any) => {
                    reject(error);
                });
        });
    }

    private mapToProduct(row: any): Product {
        return {
            id: row.id || row.ID || row.productId || '',
            name: row.name || row.productName || row.title || '',
            price: parseFloat(row.price || row.cost || row.value || 0)
        };
    }
}