import { LessThan, LessThanOrEqual, MoreThanOrEqual, MoreThan } from 'typeorm';
import { StatusTrabalho, TipoTrabalho, trampoRepository } from '../models';
import { envRequired } from './constants';
import ms from 'ms';

const finishExpiredTrampo = async () => {
  envRequired && console.log('[BACKGROUND] Checking for expired "Trampo"!');

  // const agora = new Date();

  // const inicio = new Date(agora.toDateString());
  // const fim = new Date(
  //   Date.UTC(
  //     agora.getFullYear(),
  //     agora.getMonth(),
  //     agora.getDate(),
  //     23,
  //     23,
  //     23,
  //     999
  //   )
  // );
};

export { finishExpiredTrampo };
