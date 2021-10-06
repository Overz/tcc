import { get } from 'env-var';

export const NODE_ENV = process.env.NODE_ENV !== 'test';
export const envRequired = NODE_ENV && !process.env.TS_NODE_DEV;

export let JWT_KEY = '',
  MAIL_SENDER = '',
  SMTP_HOST = '',
  SMTP_PASSWORD = '',
  SMTP_PORT = 0,
  SMTP_USER = '',
  GOOGLE_API_KEY = '',
  DB_URL = '',
  TRAMPO_EXPIRATION_TIME = '';

export const constants = () => {
  DB_URL = get('DB_URL').required(envRequired).asString();
  JWT_KEY = get('JWT_KEY').required(envRequired).asString();
  MAIL_SENDER = get('MAIL_SENDER').required(envRequired).asString();
  SMTP_HOST = get('SMTP_HOST').required(envRequired).asString();
  SMTP_PASSWORD = get('SMTP_PASSWORD').required(envRequired).asString();
  SMTP_PORT = get('SMTP_PORT').required(envRequired).asInt();
  SMTP_USER = get('SMTP_USER').required(envRequired).asString();
  GOOGLE_API_KEY = get('GOOGLE_API_KEY').required(envRequired).asString();
  TRAMPO_EXPIRATION_TIME = get('TRAMPO_EXPIRATION_TIME')
    .required(envRequired)
    .asString();
};
