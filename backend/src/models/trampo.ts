import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Endereco } from './endereco';
import { Usuario } from './usuario';

export enum TipoTrabalho {
  ONLINE = 'O',
  PRESENCIAL = 'P',
}

export enum StatusTrabalho {
  FINALIZADO = 'F',
  CANCELADO = 'C',
  PENDENTE = 'P',
}

export enum FinalizacaoPendente {
  SIM = 'S',
  NAO = 'N',
}

@Entity({ name: 'trampo' })
export class Trampo {
  @PrimaryGeneratedColumn({ name: 'cdtrampo', type: 'integer' })
  cdTrampo!: number;

  @JoinColumn({ name: 'cdendereco' })
  @ManyToOne(() => Endereco, (endereco) => endereco.cdEndereco, {
    nullable: true,
    eager: true,
  })
  cdEndereco?: number | null | Endereco;

  @JoinColumn({ name: 'cdcontratante' })
  @ManyToOne(() => Usuario, (usuario) => usuario.cdUsuario, {
    nullable: false,
    eager: true,
  })
  cdContratante!: number | Usuario;

  @JoinColumn({ name: 'cdcontratado' })
  @ManyToOne(() => Usuario, (usuario) => usuario.cdUsuario, {
    nullable: true,
    eager: true,
  })
  cdContratado?: number | null | Usuario;

  @Column({ name: 'nmgrupo', type: 'text', nullable: false })
  nmGrupo!: string;

  @Column({ name: 'nmareatrabalho', type: 'text', nullable: false })
  nmAreaTrabalho!: string;

  @Column({
    name: 'fltipo',
    type: 'varchar',
    nullable: false,
    enum: TipoTrabalho,
  })
  flTipo!: TipoTrabalho;

  @Column({
    name: 'vlremuneracao',
    type: 'text',
    nullable: false,
  })
  vlRemuneracao!: string;

  @CreateDateColumn({ name: 'dtentrega', nullable: false })
  dtEntrega!: Date;

  @Column({ name: 'dedescricao', type: 'text', nullable: false })
  deDescricao!: string;

  @Column({
    name: 'flstatus',
    type: 'varchar',
    nullable: false,
    default: StatusTrabalho.PENDENTE,
    enum: StatusTrabalho,
  })
  flStatus!: StatusTrabalho;

  @CreateDateColumn({ name: 'dtpublicado', nullable: false })
  dtPublicado!: Date;

  @CreateDateColumn({ name: 'dtvalidade', nullable: true })
  dtValidade?: Date | null;

  @Column({
    name: 'flfinalizacaopendente',
    type: 'varchar',
    nullable: false,
    default: FinalizacaoPendente.NAO,
    enum: FinalizacaoPendente,
  })
  flFinalizacaoPendente!: FinalizacaoPendente;
}
