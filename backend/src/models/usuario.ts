import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Endereco } from './endereco';

export enum StatusUsuario {
  ATIVO = 'A',
  INATIVO = 'I',
}

@Entity({ name: 'usuario' })
export class Usuario {
  @PrimaryGeneratedColumn({
    name: 'cdusuario',
    type: 'integer',
  })
  cdUsuario!: number;

  @JoinColumn({ name: 'cdendereco' })
  @OneToMany(() => Endereco, (enderecos) => enderecos.cdUsuario, {
    nullable: true,
  })
  cdEndereco!: number[] | Endereco[];

  @Column({ name: 'deemail', type: 'text', nullable: false, unique: true })
  deEmail!: string;

  @Column({ name: 'desenha', type: 'text', nullable: false })
  deSenha!: string;

  @Column({ name: 'nmnome', type: 'text', nullable: false })
  nmNome!: string;

  @Column({ name: 'nucpf', type: 'text', nullable: false, unique: true })
  nuCpf!: string;

  @Column({ name: 'nutelefone', type: 'text', nullable: false })
  nuTelefone!: string;

  @Column({
    name: 'flstatus',
    type: 'text',
    nullable: false,
    enum: StatusUsuario,
    default: StatusUsuario.INATIVO,
  })
  flStatus!: StatusUsuario;

  @Column({ name: 'depicture', type: 'text', nullable: false })
  dePicture!: string;

  @Column({ name: 'desobre', type: 'text', nullable: false })
  deSobre!: string;

  @Column({ name: 'detoken', type: 'text', nullable: true })
  deToken?: string | null;

  @CreateDateColumn({ name: 'dtcriacao', nullable: false })
  dtCriacao!: Date;

  @Column({ name: 'nuavaliacao', type: 'float', nullable: true, default: 0 })
  nuAvaliacao!: number;

  @Column({
    name: 'nutotaltrampos',
    type: 'integer',
    nullable: false,
    default: 0,
  })
  nuTotalTrampos!: number;
}
