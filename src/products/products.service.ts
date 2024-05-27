import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { I_PRODUCT_REQUEST, T_PRODUCT_RESPONSE } from 'src/model/product.model';
import { ProductValidation } from './product.validation';
import { I_COMMON_QUERY } from 'src/model/query.module';
import { queryBuilder } from 'helper';

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
    id?: any,
  ): Promise<Array<T_PRODUCT_RESPONSE>> {
    const queryWhere = queryBuilder({ id: Number(id?.id) });
    const products = this.prismaService.products.findMany({
      skip: Number(request?.skip ?? 0),
      take: Number(request?.take ?? 0),
      where: {
        ...queryWhere,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return products;
  }

  async updateProducts(
    request: I_PRODUCT_REQUEST,
    id: any,
  ): Promise<T_PRODUCT_RESPONSE> {
    const product = this.prismaService.products.update({
      where: {
        id: Number(id?.id),
      },
      data: {
        name: request?.name,
        description: request?.description,
        price: request?.price,
      },
    });

    return product;
  }

  async deleteProducts(id: any): Promise<T_PRODUCT_RESPONSE> {
    const product = this.prismaService.products.delete({
      where: {
        id: Number(id?.id),
      },
    });

    return product;
  }
}
