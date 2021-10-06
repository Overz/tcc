import { useData } from '../tests/data';
import { finishExpiredTrampo } from './background-finish';

it('', async () => {
  await useData('main');

  await finishExpiredTrampo();
});
