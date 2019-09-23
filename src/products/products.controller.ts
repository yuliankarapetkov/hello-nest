import { Controller, Get, Param, NotFoundException, Body, Post, Delete, Put } from '@nestjs/common';

import { ProductsService } from './products.service';
import { Product } from './product';

@Controller('products')
export class ProductsController {
    constructor(
        private _productsService: ProductsService
    ) {}

    @Post()
    create(@Body() product: Product): Product {
        return this._productsService.createProduct(product);
    }

    @Get()
    getAll(): Product[] {
        return this._productsService.getProducts();
    }

    @Get(':id')
    get(@Param('id') id: string): Product {
        const product = this._productsService.getProduct(id);

        if (!product) {
            throw new NotFoundException();
        }

        return product;
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() product: Product): Product {
        return this._productsService.updateProduct(id, product);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Product {
        return this._productsService.deleteProduct(id);
    }
}
