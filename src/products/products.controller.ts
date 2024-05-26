import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ErrorFilter } from 'src/common/error.filter';
import { I_PRODUCT_REQUEST, T_PRODUCT_RESPONSE } from 'src/model/product.model';
import { I_META, I_WEBRESPONSE } from 'src/model/web.model';
import { ProductsService } from './products.service';
import { TransformerService } from 'src/common/transformer.service';
import { I_COMMON_QUERY } from 'src/model/query.module';

@Controller('v1/products')
export class ProductsController {
  constructor(
    private productService: ProductsService,
    private JSON: TransformerService<any>,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @UseFilters(ErrorFilter)
  async createProducts(
    @Body() request: I_PRODUCT_REQUEST,
    @Req() data: Request,
  ): Promise<I_WEBRESPONSE<T_PRODUCT_RESPONSE, I_META>> {
    const product = await this.productService.createProduct(
      request,
      await data['user'].id,
    );

    return await this.JSON.response(product);
  }

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @UseFilters(ErrorFilter)
  async getProducts(
    @Query() request: I_COMMON_QUERY,
  ): Promise<I_WEBRESPONSE<Array<T_PRODUCT_RESPONSE>, I_META>> {
    const params = {
      skip: request?.skip,
      take: request?.take,
      page: request?.page,
      limit: request?.limit,
      search: request?.search,
    };
    const products = await this.productService.getProducts(params);

    return this.JSON.response(products);
  }
}
