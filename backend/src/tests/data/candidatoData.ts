import { candidatoRepository } from '../../models';

export const candidatoData = async () => {
  await candidatoRepository.save({
    cdTrampo: 1,
    cdCandidato: 1,
    nmCandidato: 'Joao',
    nmVaga: 'vaga1',
  });

  await candidatoRepository.save({
    cdTrampo: 2,
    cdCandidato: 1,
    nmCandidato: 'Joao',
    nmVaga: 'vaga2',
  });

  await candidatoRepository.save({
    cdTrampo: 3,
    cdCandidato: 2,
    nmCandidato: 'Joao',
    nmVaga: 'vaga3',
  });
};
