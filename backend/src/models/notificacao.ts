import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TipoNotificacao {
  NOVO = 'N',
  ACEITO = 'A',
  CANCELADO = 'C',
  FINALIZANDO = 'F',
}

@Entity({ name: 'notificacao' })
export class Notificacao {
  @PrimaryGeneratedColumn({ name: 'cdnotificacao', type: 'integer' })
  cdNotificacao!: number;

  @Column({ name: 'cdnotificado', type: 'integer', nullable: false })
  cdNotificado!: number;

  @Column({ name: 'cdnotificante', type: 'integer', nullable: false })
  cdNotificante!: number;

  @Column({ name: 'cdtrampo', type: 'integer', nullable: false })
  cdTrampo!: number;

  @Column({ name: 'demensagem', type: 'text', nullable: false })
  deMessage!: string;

  @Column({ name: 'flvisto', type: 'boolean', nullable: false, default: false })
  flVisto!: boolean;

  @Column({
    name: 'tpnotificacao',
    type: 'text',
    nullable: false,
    enum: TipoNotificacao,
  })
  tpNotificacao!: TipoNotificacao;

  @Column({
    name: 'flentregue',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  flEntregue!: boolean;
}
