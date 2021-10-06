import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Trampo } from './trampo';
import { Usuario } from './usuario';

export enum TipoElogio {
  NENHUM = 'NENHUM',
  ADAPTAVEL = 'ADAPTAVEL',
  BOM = 'BOM',
  CARISMATICO = 'CARISMATICO',
  COMPETENTE = 'COMPETENTE',
  COPERATIVO = 'COPERATIVO',
  CRIATIVO = 'CRIATIVO',
  EFICIENTE = 'EFICIENTE',
  EXCELENTE = 'EXCELENTE',
  INCRIVEL = 'INCRIVEL',
  ORGANIZADO = 'ORGANIZADO',
  OTIMO = 'OTIMO',
  RAPIDO = 'RAPIDO',
  ZELOSO = 'ZELOSO',
  QUERIDO = 'QUERIDO',
}

@Entity({ name: 'avaliacao' })
export class Avaliacao {
  @PrimaryGeneratedColumn({
    name: 'cdavaliacao',
    type: 'integer',
  })
  cdAvaliacao!: number;

  @JoinColumn({ name: 'cdtrampo' })
  @ManyToOne(() => Trampo, (trampo) => trampo.cdTrampo)
  cdTrampo!: number | Trampo;

  @JoinColumn({ name: 'cdavaliador' })
  @OneToOne(() => Usuario, (usuario) => usuario.cdUsuario)
  cdAvaliador!: number | Usuario;

  @JoinColumn({ name: 'cdavaliado' })
  @ManyToOne(() => Usuario, (usuario) => usuario.cdUsuario)
  cdAvaliado!: number | Usuario;

  @Column({ name: 'nunota', type: 'float', nullable: false, default: 5.0 })
  nuNota!: number;

  @Column({
    name: 'tpelogio',
    type: 'text',
    nullable: false,
    enum: TipoElogio,
    default: TipoElogio.NENHUM,
  })
  tpElogio!: TipoElogio;

  // SELECT tpelogio, COUNT(*) FROM avaliacao GROUP BY tpelogio;
  @Column({ name: 'nutotalelogios', type: 'integer', nullable: false })
  nuTotalElogios!: number;
}
