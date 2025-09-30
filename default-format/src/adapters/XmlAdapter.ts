import { Product, IProductProvider } from '../types';
import { readFileSync } from 'fs';
import xml2js from 'xml2js';

export class XmlAdapter implements IProductProvider {
    constructor(private filePath: string) {}

    async load(): Promise<Product[]> {
        const content = readFileSync(this.filePath, 'utf-8');
        const parser = new xml2js.Parser();
        
        const result = await parser.parseStringPromise(content);
        
        const products = this.extractProducts(result);
        return products.map((item: any) => this.mapToProduct(item));
    }

    private extractProducts(xmlObject: any): any[] {
        if (xmlObject.products && xmlObject.products.product) {
            return Array.isArray(xmlObject.products.product) 
                ? xmlObject.products.product 
                : [xmlObject.products.product];
        }
        
        if (xmlObject.product) {
            return Array.isArray(xmlObject.product) 
                ? xmlObject.product 
                : [xmlObject.product];
        }
        
        const values = Object.values(xmlObject);
        for (const value of values) {
            if (Array.isArray(value)) {
                return value;
            }
            if (typeof value === 'object' && value !== null) {
                const nested = this.extractProducts(value);
                if (nested.length > 0) return nested;
            }
        }
        
        return [];
    }

    private mapToProduct(item: any): Product {
        const getId = (obj: any) => obj.id?.[0] || obj.ID?.[0] || obj.productId?.[0] || obj.$ && obj.$.id || '';
        const getName = (obj: any) => obj.name?.[0] || obj.productName?.[0] || obj.title?.[0] || obj.$ && obj.$.name || '';
        const getPrice = (obj: any) => parseFloat(obj.price?.[0] || obj.cost?.[0] || obj.value?.[0] || obj.$ && obj.$.price || 0);

        return {
            id: getId(item),
            name: getName(item),
            price: getPrice(item)
        };
    }
}