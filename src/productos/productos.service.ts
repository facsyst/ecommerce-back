import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { Categoria } from 'src/categorias/entities/categoria.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepositorio: Repository<Producto>,

    @InjectRepository(Categoria)
    private categoriaRepositorio: Repository<Categoria>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const categoria = await this.categoriaRepositorio.findOne({
      where: { id: createProductoDto.categoriaId },
    });

    if (!categoria) throw new NotFoundException('Categoría no encontrada');

    const producto = this.productoRepositorio.create({
      ...createProductoDto,
      categoria,
    });
    return this.productoRepositorio.save(producto);
  }

  findAll(): Promise<Producto[]> {
    return this.productoRepositorio.find({ relations: ['categoria'] });
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepositorio.findOne({
      where: { id },
      relations: ['categoria'],
    });

    if (!producto) throw new NotFoundException('Producto no encontrado');
    return producto;
  }

  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
  ): Promise<Producto> {
    const producto = await this.productoRepositorio.findOne({ where: { id } });

    if (!producto) throw new NotFoundException('Producto no encontrado');

    if (updateProductoDto.categoriaId) {
      const categoria = await this.categoriaRepositorio.findOne({
        where: { id: updateProductoDto.categoriaId },
      });
      if (!categoria) throw new NotFoundException('Categoría no encontrada');
      producto.categoria = categoria;
    }

    Object.assign(producto, updateProductoDto);
    return this.productoRepositorio.save(producto);
  }

  async remove(id: number): Promise<void> {
    const producto = await this.productoRepositorio.findOne({ where: { id } });
    if (!producto) throw new NotFoundException('Producto no encontrado');
    await this.productoRepositorio.remove(producto);
  }
}
