import { Connection } from 'typeorm';
import { getApp } from '../app';
import { connect } from '../models';
import {
  setupGoogleApiService,
  useGoogleApiServices,
} from '../services/google';
import { constants } from '../utils/constants';
import { MockGoogleApiServices } from './mock/google.mock';

export let db: Connection;
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockImplementation(() => ({
    sendMail: jest.fn().mockImplementation(() => ({ messageId: 'abc' })),
    options: { host: '' },
  })),
  createTestAccount: jest.fn().mockImplementation(() => ({
    user: '',
    pass: '',
  })),
}));

beforeAll(async () => {
  process.env.JWT_KEY = 'JWT_KEY';
  process.env.MAIL_SENDER = 'trampo@no-reply.com.br';
  process.env.SMTP_HOST = 'smtp.ethereal.email';
  process.env.SMTP_PASSWORD = 'teste';
  process.env.SMTP_PORT = '543';
  process.env.SMTP_USER = 'teste';
  constants();

  db = await connect({ type: 'sqlite', database: ':memory:' });
  getApp();
});

beforeEach(async () => {
  jest.clearAllMocks();
  useGoogleApiServices(new MockGoogleApiServices());
  await db.synchronize(true);
});

afterAll(async () => {
  await db.close();
});
