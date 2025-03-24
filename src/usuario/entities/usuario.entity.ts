import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sale } from '../../sales/entities/sale.entity';
import { LoginHistory } from 'src/login_history/entities/login_history.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ length: 30 })
  nom_persona: string;

  @Column({ length: 10, unique: true })
  username: string;

  @Column({ length: 10 })
  password: string;

  @Column({ length: 15 })
  rol: string;

  @OneToMany(() => Sale, (sale) => sale.usuario)
  sales: Sale[];

  @OneToMany(() => LoginHistory, (login) => login.usuario)
  logins: LoginHistory[];
}
