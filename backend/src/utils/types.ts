/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Class<T> {
  new (): T;
}

export interface Indexable {
  [id: string]: any;
}
