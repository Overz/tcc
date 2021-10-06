import { Router, Request, Response } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Endereco } from '../../models';
import { buildPagination } from '../../utils/pagination/pagination';
import { enderecoList } from '../../views/endereco-view';

const router = Router();

router.get(
  '/api/endereco',
  requireAuth,
  async (req: Request, res: Response) => {
    const pageResult = await buildPagination(req.query, Endereco);
    res.send({ ...pageResult, data: enderecoList(pageResult.data) });
  }
);

export { router as listarEnderecoRouter };
