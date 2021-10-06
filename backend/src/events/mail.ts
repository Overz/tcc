import {
  createTransport,
  createTestAccount,
  getTestMessageUrl,
  Transporter,
} from 'nodemailer';
import {
  envRequired,
  SMTP_HOST,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_USER,
} from '../utils/constants';
import { Indexable } from '../utils/types';

interface MailMessage {
  sender: string;
  recipient: string;
  subject: string;
  body: string;
}

/**
 * Retorna uma função async que, quando invocada, cria um objeto transporter/mail caso não exista,
 * que é capaz de enviar o email.
 *
 * O Conteúdo da mensagem é definido utilizando através da interface, contendo:
 * sender, recipient, subject, body.
 *
 * A Função retorna um email pronto para ser utilizado/enviado.
 *
 * @param transporter Mail (Transporter)
 * @param mailMessage MailMessage (Interface send-mail)
 */
export const sendMail = async (
  transporter: Transporter,
  mailMessage: MailMessage
) => {
  const transp = transporter || (await createDefaultTransporter());

  const info = await transp.sendMail({
    from: mailMessage.sender,
    to: mailMessage.recipient,
    subject: mailMessage.subject,
    text: mailMessage.body,
    html: mailMessage.body,
  });

  envRequired &&
    console.log(
      `[APP] Sent mail "${mailMessage.subject}" (${mailMessage.recipient}), messageId: ${info.messageId}`
    );

  if (isEthereal(transp)) {
    console.log(`Preview: ${getTestMessageUrl(info)}`);
  }
};

const isEthereal = (transporter: Transporter): boolean => {
  return (transporter.options as Indexable).host === 'smtp.ethereal.email';
};

/**
 * Retorna uma função async que cria um configurações SMTP default
 * com host, port, user, e pass para repasse da mensagens
 */
export const createDefaultTransporter = async () => {
  const host = SMTP_HOST;
  const port = SMTP_PORT;
  let user = SMTP_USER;
  let pass = SMTP_PASSWORD;

  if (
    host === 'smtp.ethereal.email' ||
    user === 'ethereal' ||
    pass === 'ethereal'
  ) {
    const acc = await createTestAccount();
    user = acc.user;
    pass = acc.pass;
  }

  return createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
};
