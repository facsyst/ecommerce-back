import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Product } from '../../products/entities/product.entity';

export class Sale {
  @PrimaryGeneratedColumn()
  id_venta: number;

  @ManyToOne(() => Product, (producto) => producto.sales)
  producto: Product;

  @ManyToOne(() => Usuario, (usuario) => usuario.sales)
  usuario: Usuario;

  @Column({ type: 'numeric' })
  monto_final: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_venta: Date;
}
