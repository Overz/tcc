import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './usuario';

@Entity({ name: 'denuncia' })
export class Denuncia {
  @PrimaryGeneratedColumn({ name: 'cddenuncia', type: 'integer' })
  cdDenuncia!: number;

  @JoinColumn({ name: 'cdusuario' })
  @ManyToOne(() => Usuario, (usuario) => usuario.cdUsuario)
  cdUsuario!: number | Usuario;

  @Column({ name: 'dedescricao', type: 'text', nullable: false })
  deDescricao!: string;
}
