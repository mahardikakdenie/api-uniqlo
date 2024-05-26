import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { I_PRODUCT_REQUEST, T_PRODUCT_RESPONSE } from 'src/model/product.model';
import { ProductValidation } from './product.validation';
import { I_COMMON_QUERY } from 'src/model/query.module';

@Injectable()
export class ProductsService {
  constructor(
    private prismaService: PrismaService,
    private validation: ValidationService,
  ) {}

  async createProduct(
    request: I_PRODUCT_REQUEST,
    userId: number,
  ): Promise<T_PRODUCT_RESPONSE> {
    request.owner_id = userId;
    const validProductRequest = this.validation.validate<I_PRODUCT_REQUEST>(
      ProductValidation?.CREATE_PRODUCT,
      request,
    );
    const product = this.prismaService?.products?.create({
      data: {
        name: validProductRequest?.name,
        description: validProductRequest?.description,
        price: validProductRequest?.price,
        ownerId: validProductRequest.owner_id,
      },
    });

    return product;
  }

  async getProducts(
    request: I_COMMON_QUERY,
  ): Promise<Array<T_PRODUCT_RESPONSE>> {
    const products = this.prismaService.products.findMany({
      skip: Number(request?.skip ?? 0),
      include: {
        owner: true,
      }
    });

    return products;
  }
}
