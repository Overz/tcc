/* eslint-disable @typescript-eslint/no-explicit-any */
import { FindManyOptions, getRepository } from 'typeorm';
import { Class } from '../types';

export interface PageResult {
  data: any;
  page: number;
  pageSize: number;
  totalRecords: number;
}

export const buildPagination = async <T>(
  data: any,
  cls: Class<T>,
  options?: FindManyOptions<T>
): Promise<PageResult> => {
  let { page, pageSize } = data;

  delete data.page;
  delete data.pageSize;

  page = +page || 0;
  pageSize = +pageSize || 10;

  let opts: FindManyOptions = {
    skip: page * pageSize,
    take: pageSize,
    where: data,
    order: options?.order,
  };

  if (options) {
    const { where = {}, ...otherOptions } = options;
    const defaultWhere = (opts.where as any) || {};

    opts = {
      ...opts,
      ...otherOptions,
      where: { ...defaultWhere, ...(where as any) },
    };
  }

  const [find, count] = await getRepository(cls).findAndCount(opts);

  return {
    data: find,
    page,
    pageSize,
    totalRecords: count,
  };
};
