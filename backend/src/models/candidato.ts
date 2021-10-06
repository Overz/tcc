import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Trampo } from './trampo';
import { Usuario } from './usuario';

@Entity({ name: 'candidato' })
export class Candidato {
  @JoinColumn({ name: 'cdcandidato' })
  @ManyToOne(() => Usuario, (usuario) => usuario.cdUsuario, {
    primary: true,
    nullable: false,
    eager: true,
  })
  cdCandidato!: number | Usuario;

  @JoinColumn({ name: 'cdtrampo' })
  @ManyToOne(() => Trampo, (trampo) => trampo.cdTrampo, {
    primary: true,
    nullable: false,
    eager: true,
  })
  cdTrampo!: number | Trampo;

  @Column({ name: 'nmvaga', type: 'text', nullable: false })
  nmVaga!: string;

  @Column({ name: 'nmcandidato', type: 'text', nullable: false })
  nmCandidato!: string;
}
