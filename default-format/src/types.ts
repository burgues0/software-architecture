export interface Product {
    id: string;
    name: string;
    price: number;
}

export interface IProductProvider {
    load(): Promise<Product[]>;
}