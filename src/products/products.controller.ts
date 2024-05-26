import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
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
@UseGuards(AuthGuard)
@UseFilters(ErrorFilter)
export class ProductsController {
  constructor(
    private productService: ProductsService,
    private JSON: TransformerService<any>,
  ) {}

  @Post()
  @HttpCode(200)
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
  async getProducts(
    @Query() request: I_COMMON_QUERY,
    @Query() id?: number,
  ): Promise<I_WEBRESPONSE<Array<T_PRODUCT_RESPONSE>, I_META>> {
    const products = await this.productService.getProducts(request, id);

    return this.JSON.response(products);
  }

  @Put('/:id')
  @HttpCode(200)
  async updateProduct(
    @Body() request: I_PRODUCT_REQUEST,
    @Param() id: number,
  ): Promise<I_WEBRESPONSE<T_PRODUCT_RESPONSE, I_META>> {
    const product = await this.productService.updateProducts(request, id);

    return this.JSON.response(product);
  }

  @Delete('/:id')
  @HttpCode(200)
  async deleteProduct(
    @Param() id: number,
  ): Promise<I_WEBRESPONSE<T_PRODUCT_RESPONSE, I_META>> {
    await this.productService.deleteProducts(id);

    return this.JSON.response(null);
  }
}
