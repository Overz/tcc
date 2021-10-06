import { TipoElogio } from '../../models';

const senha = '$2b$10$B3dbVqoSzetkekW49yZu7er1cuXDWe2VPzY/8d63PZCocYDlkuzQm';

// USUARIOS
const usuario01 = `
INSERT INTO usuario (deEmail, deSenha, nmNome, nuCpf, nuTelefone, flStatus, dePicture, deSobre)
VALUES ('a@a.com', '${senha}', 'Christian Lima', '10620434996', '48999222534', 'A', 'CL', 'Formado em Analise e Desenvolvimento de Sistemas, trabalho na área a 2 anos');
`;

const usuario02 = `
INSERT INTO usuario (deEmail, deSenha, nmNome, nuCpf, nuTelefone, flStatus, dePicture, deSobre)
VALUES ('b@b.com', '${senha}', 'Gustavo Rodrigues', '51543989047', '48991735776', 'A', 'GR', 'Conhecimentos em Consultoria, TI, Alimenticios e Tecnologia');
`;

const usuario03 = `
INSERT INTO usuario (deEmail, deSenha, nmNome, nuCpf, nuTelefone, flStatus, dePicture, deSobre)
VALUES ('c@c.com', '${senha}', 'Arthur Martins', '72049471009', '48991310801', 'A', 'AM', 'Conhecimentos em Consultoria, TI, Alimenticios e Tecnologia');
`;

const usuario04 = `
INSERT INTO usuario (deEmail, deSenha, nmNome, nuCpf, nuTelefone, flStatus, dePicture, deSobre)
VALUES ('d@d.com', '${senha}', 'A A', '57486366037', '48998765432', 'A', 'AA', 'descricao');
`;

const usuario05 = `
INSERT INTO usuario (deEmail, deSenha, nmNome, nuCpf, nuTelefone, flStatus, dePicture, deSobre)
VALUES ('e@e.com', '${senha}', 'B B', '81087709040', '48998765433', 'A', 'BB', 'descricao');
`;

const usuario06 = `
INSERT INTO usuario (deEmail, deSenha, nmNome, nuCpf, nuTelefone, flStatus, dePicture, deSobre)
VALUES ('f@f.com', '${senha}', 'C C', '57768498020', '48998765434', 'A', 'CC', 'descricao');
`;

const usuario07 = `
INSERT INTO usuario (deEmail, deSenha, nmNome, nuCpf, nuTelefone, flStatus, dePicture, deSobre)
VALUES ('g@g.com', '${senha}', 'D D', '90431021058', '48998765435', 'A', 'CC', 'descricao');
`;

const usuario08 = `
INSERT INTO usuario (deEmail, deSenha, nmNome, nuCpf, nuTelefone, flStatus, dePicture, deSobre)
VALUES ('h@h.com', '${senha}', 'E E', '23706458063', '48998765436', 'A', 'DD', 'descricao');
`;

const usuario09 = `
INSERT INTO usuario (deEmail, deSenha, nmNome, nuCpf, nuTelefone, flStatus, dePicture, deSobre)
VALUES ('i@i.com', '${senha}', 'F F', '68070365072', '48998765437', 'A', 'EE', 'descricao');
`;

const usuario10 = `
INSERT INTO usuario (deEmail, deSenha, nmNome, nuCpf, nuTelefone, flStatus, dePicture, deSobre)
VALUES ('j@j.com', '${senha}', 'G G', '50942610024', '48998765438', 'A', 'FF', 'descricao');
`;

// ENDEREÇOS
const endereco01 = `
INSERT INTO endereco (cdUsuario, sgEstado, nmPais, nmCidade, nmBairro, nmRua, nuNumero, nuCep, nuLatitude, nuLongitude, deNome)
VALUES ('1', 'SC', 'Brasil', 'FLORIANOPOLIS', 'Jardim Atlântico', 'Rua José Luiz Vieira', '592-c', '88095-380', '-27.5858976', '-48.5986149', 'Casa');
`;

const endereco02 = `
INSERT INTO endereco (cdUsuario, sgEstado, nmPais, nmCidade, nmBairro, nmRua, nuNumero, nuCep, nuLatitude, nuLongitude, deNome)
VALUES ('1', 'SC', 'Brasil', 'SAO_JOSE', 'Kobrasol', 'Rua Tiradentes', '3', '88160-000', '-27.6012237', '-48.6170463', 'Senac');
`;

const endereco03 = `
INSERT INTO endereco (cdUsuario, sgEstado, nmPais, nmCidade, nmBairro, nmRua, nuNumero, nuCep, nuLatitude, nuLongitude, deNome)
VALUES ('2', 'SC', 'Brasil', 'BIGUACU', 'Fundos Biguaçu', 'Inês Maria Ferreira', '26', '88102-040', '-27.5007747', '-48.6839337', 'Casa');
`;
const endereco04 = `
INSERT INTO endereco (cdUsuario, sgEstado, nmPais, nmCidade, nmBairro, nmRua, nuNumero, nuCep, nuLatitude, nuLongitude, deNome)
VALUES ('2', 'SC', 'Brasil', 'BIGUACU', 'Centro', 'Rua 7 de Setembro', '695', '88102-040', '-27.496773', '-48.647186', 'Prefeitura');
`;

const endereco05 = `
INSERT INTO endereco (cdUsuario, sgEstado, nmPais, nmCidade, nmBairro, nmRua, nuNumero, nuCep, nuLatitude, nuLongitude, deNome)
VALUES ('3', 'SC', 'Brasil', 'SAO_JOSE', 'Centro', 'Rua Joaquim Vaz', '869', '88102-650', '-27.6045909', '-48.623759', 'Escola');
`;

const endereco06 = `
INSERT INTO endereco (cdUsuario, sgEstado, nmPais, nmCidade, nmBairro, nmRua, nuNumero, nuCep, nuLatitude, nuLongitude, deNome)
VALUES ('3', 'SC', 'Brasil', 'SAO_JOSE', 'Centro', 'Rua Gerôncio Thives', '1079', '88117-292', '-27.5857246', '-48.613544', 'Shopping');
`;

const dateAdd = (n: string | number) => `(select NOW() + INTERVAL '${n} DAY')`;
const dateRemove = (n: string | number) =>
  `(select NOW() - INTERVAL '${n} DAY')`;

const trampo01 = `
INSERT INTO trampo (cdEndereco, cdContratante, cdContratado, nmGrupo, nmAreaTrabalho, flTipo, vlRemuneracao, dtEntrega, deDescricao,
                    flStatus, dtPublicado, dtValidade, flFinalizacaoPendente)
VALUES (null, '2', null, 'tecnologia', 'Desenvolvimento', 'O', '3000', '2021-10-20 00:32:13.65915+00', 'Desenvolver um aplicativo que que agenda tarefas de modo ergonomico',
'P', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'N');
`;

const trampo02 = `
INSERT INTO trampo (cdEndereco, cdContratante, cdContratado, nmGrupo, nmAreaTrabalho, flTipo, vlRemuneracao, dtEntrega, deDescricao,
  flStatus, dtPublicado, dtValidade, flFinalizacaoPendente)
VALUES ('1', '2', null, 'saude', 'massagista', 'P', '600', '2021-10-20 00:32:13.65915+00', 'Massagem ortopédica', 'P', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'N');
`;

// const avaliacao01 = `
// INSERT INTO avaliacao (cdTrampo, cdAvaliador, cdAvaliado, nuNota, tpElogio, nuTotalElogios)
// VALUES ('1', '1', '1', '5.0', '${TipoElogio.BOM}', )
// `
// const avaliacao02 = `
// INSERT INTO avaliacao (cdTrampo, cdAvaliador, cdAvaliado, nuNota, tpElogio, nuTotalElogios)
// VALUES ('1', '2', '1', '4.5', '${TipoElogio.BOM}', )
// `
// const avaliacao03 = `
// INSERT INTO avaliacao (cdTrampo, cdAvaliador, cdAvaliado, nuNota, tpElogio, nuTotalElogios)
// VALUES ('1', '2', '1', '5.0', '${TipoElogio.BOM}', )
// `
// const avaliacao04 = `
// INSERT INTO avaliacao (cdTrampo, cdAvaliador, cdAvaliado, nuNota, tpElogio, nuTotalElogios)
// VALUES ('1', '2', '1', '5.0', '${TipoElogio.BOM}', )
// `
// const avaliacao05 = `
// INSERT INTO avaliacao (cdTrampo, cdAvaliador, cdAvaliado, nuNota, tpElogio, nuTotalElogios)
// VALUES ('1', '2', '1', '5.0', '${TipoElogio.BOM}', )
// `

export const inserts = [
  usuario01,
  usuario02,
  usuario03,
  usuario04,
  usuario05,
  usuario06,
  usuario07,
  usuario08,
  usuario09,
  usuario10,
  endereco01,
  endereco02,
  endereco03,
  endereco04,
  endereco05,
  endereco06,
  trampo01,
  trampo02,
];
