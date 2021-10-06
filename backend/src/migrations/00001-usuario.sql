CREATE TABLE usuario
(
    cdUsuario       SERIAL                 NOT NULL,
    deEmail         TEXT                   NOT NULL,
    deSenha         TEXT                   NOT NULL,
    nmNome          TEXT                   NOT NULL,
    nuCpf           TEXT                   NOT NULL,
    nuTelefone      TEXT                   NOT NULL,
    deSobre         TEXT                   NOT NULL,
    deToken         TEXT,
    flStatus        CHAR(1)                NOT NULL
            CONSTRAINT ckc_flstatus_usuario CHECK(flStatus IN ('I', 'A'))
            DEFAULT 'I',
    dePicture       TEXT                   NOT NULL,
    dtCriacao       TIMESTAMPTZ            NOT NULL DEFAULT CURRENT_TIMESTAMP,
    nuAvaliacao     FLOAT                  NOT NULL DEFAULT 5.0,
    nuTotalTrampos  INTEGER                NOT NULL DEFAULT 0,

    CONSTRAINT pk_usuario PRIMARY KEY (cdUsuario),
    CONSTRAINT uq_usuario_email UNIQUE (deEmail),
    CONSTRAINT uq_usuario_cpf UNIQUE (nuCpf),
    CONSTRAINT uq_usuario_telefone UNIQUE (nuTelefone)
);

CREATE INDEX ix_usuario_deemail ON usuario (deEmail);
CREATE INDEX ix_usuario_nuCpf ON usuario (nuCpf);
CREATE INDEX ix_usuario_nmNome ON usuario (nmNome);
CREATE INDEX ix_usuario_nuTelefone ON usuario (nuTelefone);
CREATE INDEX ix_usuario_dtCriacao ON usuario (dtCriacao);

CREATE INDEX ix_usuario_deemail_desc ON usuario (deEmail DESC);
CREATE INDEX ix_usuario_nuCpf_desc ON usuario (nuCpf DESC);
CREATE INDEX ix_usuario_nmNome_desc ON usuario (nmNome DESC);
CREATE INDEX ix_usuario_nuTelefone_desc ON usuario (nuTelefone DESC);
CREATE INDEX ix_usuario_dtCriacao_desc ON usuario (dtCriacao DESC);


COMMENT ON TABLE usuario IS 'Usuários';
COMMENT ON COLUMN usuario.deSobre IS 'Uma descrição do usuario e suas experiências';
COMMENT ON COLUMN usuario.deToken IS 'Token utilizado na ativação da conta';
COMMENT ON COLUMN usuario.flStatus IS 'Status para o Usuario, A(Ativo), I(Inativo)';
COMMENT ON COLUMN usuario.dePicture IS 'URI utilizada para salvar uma foto do usuario, se uma/duas primeiras letras do nome/sobrenome';
COMMENT ON COLUMN usuario.dtCriacao IS 'Data de criação';