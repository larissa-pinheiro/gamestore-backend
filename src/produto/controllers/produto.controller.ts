import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Produto } from '../entities/produto.entity';
import { ProdutoService } from '../services/produto.service';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.create(produto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() produto: Produto,
  ): Promise<Produto> {
    return this.produtoService.update(id, produto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.delete(id);
  }
}
