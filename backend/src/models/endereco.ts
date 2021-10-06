import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './usuario';

@Entity({ name: 'endereco' })
export class Endereco {
  @PrimaryGeneratedColumn({
    name: 'cdendereco',
    type: 'integer',
  })
  cdEndereco!: number;

  // nome da coluna no banco que armazena o relacionamento
  @JoinColumn({ name: 'cdusuario' })
  // () => Tipo do relacionamento, (campo) => Qual o campo que armazena
  @ManyToOne(() => Usuario, (usuario) => usuario.cdEndereco)
  cdUsuario!: number | Usuario;

  @Column({ name: 'nucep', type: 'text', nullable: false })
  nuCep!: string;

  @Column({ name: 'nmbairro', type: 'text', nullable: false })
  nmBairro!: string;

  @Column({ name: 'nmrua', type: 'text', nullable: false })
  nmRua!: string;

  @Column({ name: 'nmcidade', type: 'text', nullable: false })
  nmCidade!: string;

  @Column({ name: 'sgestado', type: 'text', nullable: false })
  sgEstado!: string;

  @Column({ name: 'nmpais', type: 'text', nullable: false })
  nmPais!: string;

  @Column({ name: 'nunumero', type: 'text', nullable: false })
  nuNumero!: string;

  @Column({ name: 'nulatitude', type: 'text', nullable: false })
  nuLatitude!: string;

  @Column({ name: 'nulongitude', type: 'text', nullable: false })
  nuLongitude!: string;

  @Column({ name: 'denome', type: 'text', nullable: false })
  deNome!: string;
}
