import { Router, Request, Response } from 'express';
import { getConnection, In } from 'typeorm';
import { requireAuth } from '../../middlewares/require-auth';
import {
  enderecoRepository,
  StatusTrabalho,
  Trampo,
  Usuario,
} from '../../models';
import { getGoogleApiService } from '../../services/google';
import { sanitizeLocal } from '../../utils/sanitize-local';
import { Indexable } from '../../utils/types';
import { TrampoList } from '../../views/trampo-view';

const router = Router();

router.get(
  '/api/trampo/consulta/por-geocode',
  requireAuth,
  async (req: Request, res: Response) => {
    const { location } = req.query;
    const page = +(req.query.page as Indexable) || 0;
    const pageSize = +(req.query.pageSize as Indexable) || 10;

    const query = getConnection()
      .createQueryBuilder()
      .select([
        't.cdtrampo         as id',
        'u.nmNome           as usuario',
        'u.cdUsuario        as idusuario',
        't.dtPublicado      as dtpublicado',
        't.nmGrupo          as grupo',
        't.nmAreatrabalho   as area',
        't.vlRemuneracao    as remuneracao',
        't.flTipo           as tipo',
        't.dtEntrega        as dtentrega',
      ])
      .from(Trampo, 't')
      .innerJoin(Usuario, 'u', 't.cdContratante = u.cdUsuario')
      .where('t.flStatus = :status', { status: StatusTrabalho.PENDENTE })
      .andWhere('t.cdcontratado IS NULL')
      .orderBy('t.cdTrampo', 'DESC')
      .cache(true)
      .limit(pageSize)
      .offset(pageSize * page);

    if (location) {
      const cidades = await getCities(location as string);

      const ids = (
        await enderecoRepository.find({
          select: ['cdEndereco'],
          where: { nmCidade: In(cidades) },
        })
      ).map(({ cdEndereco }) => cdEndereco);

      if (ids.length > 0) {
        query.andWhere('(t.cdEndereco IN (:...ids) OR t.cdEndereco IS NULL)', {
          ids,
        });
      } else {
        query.andWhere('(t.cdEndereco IS NULL)');
      }
    }

    res.send({
      data: await query.getRawMany<TrampoList>(),
      page,
      pageSize,
      totalRecords: await query.getCount(),
    });
  }
);

const getCities = async (location: string) => {
  const split = String(location).split(',');

  const data = await getGoogleApiService().places({
    latitude: split[0],
    longitude: split[1],
    type: 'locality',
  });

  return data.map((name: string) => {
    if (name.includes(',')) {
      return sanitizeLocal(name.split(',')[0]);
    }

    return sanitizeLocal(name);
  });
};

export { router as listarTrampoPorGeocodeRouter };
