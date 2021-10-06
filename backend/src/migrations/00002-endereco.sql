CREATE TABLE endereco
(
    cdEndereco  SERIAL                 NOT NULL,
    cdUsuario   INTEGER                NOT NULL,
    nuCep       TEXT                   NOT NULL, 
    nmBairro    TEXT                   NOT NULL, 
    nmRua       TEXT                   NOT NULL, 
    nmCidade    TEXT                   NOT NULL, 
    sgEstado    TEXT                   NOT NULL,
    nmPais      TEXT                   NOT NULL, 
    deNome      TEXT                   NOT NULL,
    nuNumero    TEXT                   NOT NULL, 
    nuLatitude  TEXT                   NOT NULL,
    nuLongitude TEXT                   NOT NULL,

    CONSTRAINT pk_endereco PRIMARY KEY (cdEndereco),
    CONSTRAINT fk_endereco_usuario FOREIGN KEY (cdUsuario) REFERENCES usuario (cdUsuario)

);

CREATE INDEX ix_endereco_nmcidade ON endereco (nmCidade);
CREATE INDEX ix_endereco_nulatitude ON endereco (nuLatitude);
CREATE INDEX ix_endereco_nulongitude ON endereco (nuLongitude);

CREATE INDEX ix_endereco_nmcidade_desc ON endereco (nmCidade DESC);
CREATE INDEX ix_endereco_nulatitude_desc ON endereco (nuLatitude DESC);
CREATE INDEX ix_endereco_nulongitude_desc ON endereco (nuLongitude DESC);

COMMENT ON TABLE endereco IS 'Endereços cadastrados pelos usuários';
COMMENT ON COLUMN endereco.sgEstado IS 'Estado em UF: SC, SP, AM, etc...';
COMMENT ON COLUMN endereco.nmPais IS 'Pais, padrão Brasil';
COMMENT ON COLUMN endereco.deNome IS 'Nome que o usuario escolhe para exibição para facilitar busca visual, ex: Casa, Trabalho';
COMMENT ON COLUMN endereco.nuNumero IS 'Numero do estabelecimento';
COMMENT ON COLUMN endereco.nuLatitude IS 'Latitude salva pela API integrada do expo de geolocalização';
COMMENT ON COLUMN endereco.nuLongitude IS 'Longitude salva pela API integrada do expo de geolocalização';