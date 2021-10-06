import { Transporter, createTransport, createTestAccount } from 'nodemailer';
import { constants } from '../utils/constants';
import { sendMail, createDefaultTransporter } from './mail';

jest.mock('nodemailer');

describe('sendMail', () => {
  const mockTransporter = {
    host: '',
    sendMail: jest.fn(),
    options: { host: '' },
  };

  const getTransporter = () => (mockTransporter as unknown) as Transporter;

  const mailToSend = {
    sender: 'foo@bar.com',
    recipient: 'baz@bar.com',
    subject: 'Test mail',
    body: 'This is a test',
  };

  const mockedCreateTransport = createTransport as jest.Mock;
  const mockedCreateTestAccount = createTestAccount as jest.Mock;

  it('deve criar um transporter', async () => {
    process.env.SMTP_HOST = 'no-reply@imobo.com';
    process.env.SMTP_USER = 'jose';
    process.env.SMTP_PASSWORD = 'jose';
    process.env.SMTP_PORT = '587';
    constants();

    const transp = await createDefaultTransporter();
    expect(transp).toBeDefined();
    expect(mockedCreateTransport).toHaveBeenCalled();
    expect(mockedCreateTestAccount).not.toHaveBeenCalled();
  });

  it('deve criar uma conta de teste', async () => {
    process.env.SMTP_HOST = 'smtp.ethereal.email';
    process.env.SMTP_USER = 'ethereal';
    process.env.SMTP_PASSWORD = 'ethereal';
    process.env.SMTP_PORT = '587';
    constants();

    const transp = await createDefaultTransporter();
    expect(transp).toBeDefined();
    expect(mockedCreateTransport).toHaveBeenCalled();
    expect(mockedCreateTestAccount).toHaveBeenCalled();
  });

  it('deve enviar um email', async () => {
    mockTransporter.sendMail.mockResolvedValueOnce({ messageId: 'abcd' });
    await sendMail(getTransporter(), mailToSend);

    expect(mockTransporter.sendMail).toHaveBeenCalled();
    expect(mockTransporter.sendMail).toHaveBeenCalledTimes(1);
  });
});
