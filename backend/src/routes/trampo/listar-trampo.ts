import { Router, Request, Response } from 'express';
import { IsNull } from 'typeorm';
import { requireAuth } from '../../middlewares/require-auth';
import { Trampo } from '../../models';
import { buildPagination } from '../../utils/pagination/pagination';
import { trampoList } from '../../views/trampo-view';

const router = Router();

router.get('/api/trampo', requireAuth, async (req: Request, res: Response) => {
  let where = {};
  if (req.query.cdContratado === 'IS NULL') {
    where = {
      cdContratado: IsNull(),
    };
  }

  const pageResult = await buildPagination(req.query, Trampo, {
    where,
    order: { cdTrampo: 'DESC' },
  });

  res.send({
    ...pageResult,
    data: trampoList(pageResult.data),
  });
});

export { router as listarTrampoRouter };
