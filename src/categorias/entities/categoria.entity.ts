import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos: Producto[];
}
