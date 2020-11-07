import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './product.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  //private products: Product[] = [];

  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({
      //title: title,
      title,
      description: desc,
      price,
    });
    const result = await newProduct.save();
    //console.log(result);
    return result.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    //console.log(products);

    //return products as Product[];
    //To remove Underscore from _id
    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

  async getSingleProduct(productId: string) {
    //const product = this.findProduct(productId)[0];
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const updatedProduct = await this.findProduct(productId);
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    updatedProduct.save();
  }

  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({_id: prodId}).exec();
    //console.log(result);
    if (result.n === 0) {
        throw new NotFoundException('No Product Found');
    }    
  }

  private async findProduct(id: string): Promise<Product> {
    let product;

    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('No Product Found');
    }
    if (!product) {
      throw new NotFoundException('No Product Found');
    }
    return product;
  }
}

//private findProduct(id: string): [Product, number] {
//     const productIndex = this.products.findIndex((prod) => prod.id === id);
//     const product = this.products[productIndex];
//     if (!product) {
//       throw new NotFoundException('No Product Found');
//     }
//     return [product, productIndex];
//   }
