CREATE TABLE notificacao
(
    cdNotificacao SERIAL                 NOT NULL,
    cdNotificante INTEGER                NOT NULL,
    cdNotificado  INTEGER                NOT NULL,
    cdTrampo      INTEGER                NOT NULL,
    deMensagem    TEXT                   NOT NULL,
    flVisto       BOOLEAN                NOT NULL DEFAULT FALSE,
    flEntregue    BOOLEAN                NOT NULL DEFAULT FALSE,
    tpNotificacao TEXT                   NOT NULL,

    CONSTRAINT pk_notificacao PRIMARY KEY (cdnotificacao)
);

CREATE INDEX ix_notificacao_cdnotificante ON notificacao (cdNotificante);
CREATE INDEX ix_notificacao_cdnotificado ON notificacao (cdNotificado);
CREATE INDEX ix_notificacao_flVisto ON notificacao (flVIsto);

COMMENT ON TABLE notificacao IS 'Notificações enviadas aos usuários';