import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Not, Repository } from 'typeorm';
import { Produto } from '../entities/produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) { }

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find();
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: {
        id,
      },
    });

    if (!produto) {
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
    }

    return produto;
  }

  async findByName(nome: string): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: {
        nome,
      },
    });

    if (!produto) {
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
    }

    return produto;
  }

  async create(produto: Produto): Promise<Produto> {
    if (produto.id) {
      throw new HttpException('O ID não pode ser definido manualmente.', HttpStatus.BAD_REQUEST);
    }

    const produtoExistente = await this.produtoRepository.findOne({
      where: {
        nome: produto.nome,
      },
    });

    if (produtoExistente) {
      throw new HttpException('Produto já existe!', HttpStatus.CONFLICT);
    }

    return await this.produtoRepository.save(produto);
  }

  async update(id: number, produto: Produto): Promise<Produto> {
    const produtoExistente = await this.produtoRepository.findOne({
      where: { id },
    });

    if (!produtoExistente) {
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
    }

    const produtoComMesmoNome = await this.produtoRepository.findOne({
      where: {
        nome: produto.nome,
        id: Not(id),
      },
    });

    if (produtoComMesmoNome) {
      throw new HttpException('Já existe outro produto com esse nome!', HttpStatus.CONFLICT);
    }

    return await this.produtoRepository.save({
      ...produtoExistente,
      ...produto,
      id: produtoExistente.id,
    });
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.produtoRepository.delete(id);
  }
}
