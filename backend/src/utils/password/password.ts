import { hashSync, compareSync } from 'bcrypt';

export const createPassword = (pass: string) => hashSync(pass, 10);

export const checkPassword = (pass: string, hashed: string) =>
  compareSync(pass, hashed);
