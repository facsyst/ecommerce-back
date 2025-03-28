import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoryRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const category = this.categoryRepository.create(createCategoriaDto);
    return await this.categoryRepository.save(category);
  }

  //listar todos los productos
  async findAll(): Promise<Categoria[]> {
    return await this.categoryRepository.find();
  }

  //buscar un producto por ID
  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoryRepository.findOne({
      where: { id },
      relations: ['productos'],
    });

    if (!categoria) {
      throw new NotFoundException('Categoría no encontrada');
    }

    return categoria;
  }

  async update(
    id: number,
    updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<Categoria> {
    await this.findOne(id);
    await this.categoryRepository.update(id, updateCategoriaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.categoryRepository.delete(id);
  }
}
