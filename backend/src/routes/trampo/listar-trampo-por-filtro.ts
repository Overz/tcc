import { Router, Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { requireAuth } from '../../middlewares/require-auth';
import {
  enderecoRepository,
  StatusTrabalho,
  Trampo,
  Usuario,
} from '../../models';
import { sanitizeLocal } from '../../utils/sanitize-local';
import { Indexable } from '../../utils/types';
import { TrampoList } from '../../views/trampo-view';

const { PENDENTE } = StatusTrabalho;

const router = Router();

router.get(
  '/api/trampo/consulta/por-filtro',
  requireAuth,
  async (req: Request, res: Response) => {
    const page = +(req.query.page as Indexable) || 0;
    const pageSize = +(req.query.pageSize as Indexable) || 10;

    const cidade = sanitizeLocal((req.query.cidade as string) || '');
    const grupo = req.query.grupo as string;
    const area = req.query.area as string;

    const query = getConnection().createQueryBuilder();

    query
      .select([
        't.cdtrampo AS id',
        'u.nmNome AS usuario',
        'u.cdUsuario AS idusuario',
        't.dtPublicado AS dtpublicado',
        't.nmGrupo AS grupo',
        't.nmAreatrabalho AS area',
        't.vlRemuneracao AS remuneracao',
        't.flTipo AS tipo',
        't.dtEntrega AS dtentrega',
      ])
      .from(Trampo, 't')
      .innerJoin(Usuario, 'u', 't.cdContratante = u.cdUsuario')
      .where('t.flStatus = :status', { status: PENDENTE })
      .andWhere('t.cdContratado IS NULL')
      .orderBy('t.cdTrampo', 'DESC')
      .cache(true)
      .limit(pageSize)
      .offset(pageSize * page);

    if (cidade) {
      const ids = (
        await enderecoRepository.find({
          select: ['cdEndereco'],
          where: { nmCidade: cidade },
        })
      ).map(({ cdEndereco }) => cdEndereco);

      if (ids.length > 0) {
        query.andWhere('t.cdEndereco IN (:...ids)', { ids });
      }
    }

    if (grupo) {
      query.andWhere('t.nmGrupo = :grupo', { grupo });
    }

    if (area) {
      query.andWhere('t.nmAreaTrabalho = :area', { area });
    }

    res.send({
      data: await query.getRawMany<TrampoList>(),
      page,
      pageSize,
      totalRecords: await query.getCount(),
    });
  }
);

export { router as listarTrampoPorFiltroRouter };
