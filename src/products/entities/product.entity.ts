import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sale } from '../../sales/entities/sale.entity';

export class Product {
  @PrimaryGeneratedColumn()
  id_producto: number;

  @Column({ length: 30 })
  nom_producto: string;

  @Column({ length: 100 })
  descripcion: string;

  @Column({ type: 'numeric' })
  precio: number;

  @Column({ type: 'boolean', default: false })
  is_oferta: boolean;

  @Column({ type: 'numeric', nullable: true })
  porcentaje_oferta: number;

  @Column({ type: 'numeric' })
  precio_final: number;

  @OneToMany(() => Sale, (sale) => sale.producto)
  sales: Sale[];
}
