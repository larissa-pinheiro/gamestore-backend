import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Not, Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) { }

  async create(categoria: Categoria): Promise<Categoria> {
    return await this.categoriaRepository.save(categoria);
  }

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find();
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({ where: { id } });

    if (!categoria) {
      throw new NotFoundException(`Categoria com id ${id} não encontrada`);
    }

    return categoria;
  }

  async findByName(nome: string): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      where: { nome: ILike(`%${nome}%`) },
    });
  }

  async update(id: number, categoria: Categoria): Promise<Categoria> {
    const categoriaExistente = await this.categoriaRepository.findOne({ where: { id } });

    if (!categoriaExistente) {
      throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
    }

    const categoriaComMesmoNome = await this.categoriaRepository.findOne({
      where: {
        nome: categoria.nome,
        id: Not(id),
      },
    });

    if (categoriaComMesmoNome) {
      throw new HttpException('Já existe outra categoria com esse nome!', HttpStatus.CONFLICT);
    }

    return await this.categoriaRepository.save({
      ...categoriaExistente,
      ...categoria,
      id: categoriaExistente.id,
    });
  }

  async remove(id: number): Promise<void> {
    const categoria = await this.findOne(id);
    await this.categoriaRepository.remove(categoria);
  }
}
