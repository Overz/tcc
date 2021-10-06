CREATE TABLE trampo
(
    cdTrampo                SERIAL                  NOT NULL,
    cdEndereco              INTEGER,
    cdContratante           INTEGER                 NOT NULL,
    cdContratado            INTEGER,
    nmGrupo                 TEXT                    NOT NULL,
    nmAreatrabalho          TEXT                    NOT NULL,
    flTipo                  CHAR(1)                 NOT NULL
        CONSTRAINT ckc_fltipo CHECK (fltipo IN ('P', 'O')),
    vlRemuneracao           TEXT                    NOT NULL,
    dtEntrega               TIMESTAMPTZ             NOT NULL,
    deDescricao             TEXT                    NOT NULL,
    flStatus                CHAR(1)                 NOT NULL
        CONSTRAINT ckc_flstatus
        CHECK (flstatus IN ('F', 'C', 'P'))                         DEFAULT 'P',
    dtPublicado             TIMESTAMPTZ             NOT NULL        DEFAULT CURRENT_TIMESTAMP,
    dtValidade              TIMESTAMPTZ,
    flFinalizacaoPendente   CHAR(1)                 NOT NULL
        CONSTRAINT ckc_flfinalizacao_pendente
        CHECK (flFinalizacaoPendente IN ('S', 'N'))                 DEFAULT 'N',

    CONSTRAINT pk_trampo PRIMARY KEY (cdTrampo),
    CONSTRAINT fk_trampo_endereco FOREIGN KEY (cdEndereco) REFERENCES endereco (cdEndereco),
    CONSTRAINT fk_trampo_usuario_contratante FOREIGN KEY (cdContratante) REFERENCES usuario (cdUsuario),
    CONSTRAINT fk_trampo_usuario_contratado FOREIGN KEY (cdContratado) REFERENCES usuario (cdUsuario)

);

CREATE INDEX ix_trampo_cdtrampo_desc ON trampo (cdTrampo DESC);
CREATE INDEX ix_trampo_cdendereco_desc ON trampo (cdEndereco DESC);
CREATE INDEX ix_trampo_cdcontratante_desc ON trampo (cdContratante DESC);
CREATE INDEX ix_trampo_cdcontratado_desc ON trampo (cdContratante DESC);

CREATE INDEX ix_trampo_usuario_endereco ON trampo (cdTrampo, cdEndereco, cdContratante, cdContratado);
CREATE INDEX ix_trampo_usuario_endereco_desc ON trampo (cdTrampo DESC, cdEndereco DESC, cdContratante DESC, cdContratado DESC);

CREATE INDEX ix_trampo_fltipo ON trampo (flTipo);
CREATE INDEX ix_trampo_flstatus ON trampo (flStatus);
CREATE INDEX ix_trampo_dtpublicado ON trampo (dtPublicado);
CREATE INDEX ix_trampo_fltipo_desc ON trampo (flTipo DESC);
CREATE INDEX ix_trampo_flstatus_desc ON trampo (flStatus DESC);
CREATE INDEX ix_trampo_dtpublicado_desc ON trampo (dtPublicado DESC);

COMMENT ON TABLE trampo IS 'Trabalhos publicados pelos usuários';
COMMENT ON COLUMN trampo.cdEndereco IS 'Utilizado para filtragem e cadastros';
COMMENT ON COLUMN trampo.nmGrupo IS 'Grupo de trabalho (Topico)';
COMMENT ON COLUMN trampo.nmAreatrabalho IS 'Area de trabalho (Subtopico)';
COMMENT ON COLUMN trampo.flTipo IS 'Tipo do trabalho, P(Presencial), O(Online)';
COMMENT ON COLUMN trampo.vlRemuneracao IS 'Valor para receber, intermanete ou externamente';
COMMENT ON COLUMN trampo.dtEntrega IS 'Cadastrar uma data de entrega caso exista';
COMMENT ON COLUMN trampo.deDescricao IS 'Descricao das atividades do trabalho';
COMMENT ON COLUMN trampo.flStatus IS 'Status do trabalho, F(Finalizado), C(Cancelado), P(Pendente)';
COMMENT ON COLUMN trampo.dtPublicado IS 'Data de publicação do trabalho';
COMMENT ON COLUMN trampo.dtValidade IS 'Data de validade de 7 dias para o cancelamento';
COMMENT ON COLUMN trampo.flFinalizacaoPendente IS 'Pedido de finalização por parte do Contratado, A(Andamento), N(Nao), S(Sim)';
