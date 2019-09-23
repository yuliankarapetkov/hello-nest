import { Injectable } from '@nestjs/common';

import { Product } from './product';

@Injectable()
export class ProductsService {
    private _products: Product[] = [
        {
            id: '123',
            title: 'Product #123',
            description: 'Description #123',
            price: 123
        },
        {
            id: '456',
            title: 'Product #456',
            description: 'Description #456',
            price: 456
        }
    ];

    getProducts(): Product[] {
        return [...this._products];
    }

    getProduct(id: string): Product {
        return {...this._products.find(p => p.id === id)};
    }

    createProduct(incomingProduct: Product): Product {
        const product = { ...incomingProduct, id: `${Math.random()}` };
        this._products.push(product);

        return product;
    }

    updateProduct(id: string, product: Product): Product {
        const [ _, index ] = this._findProduct(id);
        this._products[index] = { ...product, id };
        return { ...this._products[index] };
    }

    deleteProduct(id: string): Product {
       const [ product, index ] = this._findProduct(id); 

       this._products.splice(index, 1);

       return product;
    }

    private _findProduct(id: string): [Product, number] {
        const index = this._products.findIndex(p => p.id === id);
        const product = this._products[index];

        return [product, index];
    }
}
