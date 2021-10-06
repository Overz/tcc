import { Router, Request, Response } from 'express';

const router = Router();

router.post('/api/usuario/logout', async (req: Request, res: Response) => {
  res.clearCookie('jwt');
  res.send({ ok: true });
});

export { router as logoutRouter };
