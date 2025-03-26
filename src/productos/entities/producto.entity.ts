import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Categoria } from 'src/categorias/entities/categoria.entity';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('decimal')
  precio: number;

  @Column('int', { default: 0 })
  stock: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  categoria: Categoria;
}
