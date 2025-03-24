import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

export class LoginHistory {
  @PrimaryGeneratedColumn()
  id_login: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.logins)
  usuario: Usuario;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_login: Date;
}
