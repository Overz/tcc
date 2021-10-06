CREATE TABLE avaliacao
(
    cdAvaliacao     SERIAL                 NOT NULL,
    cdTrampo        INTEGER                NOT NULL,
    cdAvaliador     INTEGER                NOT NULL,
    cdAvaliado      INTEGER                NOT NULL,
    nuNota          FLOAT                  NOT NULL,
    tpElogio        TEXT                   NOT NULL
        CONSTRAINT ckc_tpelogio 
        CHECK (tpElogio IN (
            'NENHUM',
            'BOM',
            'OTIMO',
            'EXCELENTE',
            'COMPETENTE',
            'RAPIDO',
            'EFICIENTE',
            'ORGANIZADO',
            'ADAPTAVEL',
            'ZELOSO',
            'QUERIDO',
            'CRIATIVO',
            'CARISMATICO',
            'COPERATIVO',
            'INCRIVEL'
        )) DEFAULT 'NENHUM',
    nuTotalElogios  INTEGER                NOT NULL DEFAULT 0,

    CONSTRAINT pk_avaliacao PRIMARY KEY (cdavaliacao),
    CONSTRAINT fk_avaliacao_cdavaliador FOREIGN KEY (cdAvaliador) REFERENCES usuario (cdUsuario),
    CONSTRAINT fk_avaliacao_cdavaliado FOREIGN KEY (cdAvaliado) REFERENCES usuario (cdUsuario),
    CONSTRAINT fk_avaliacao_cdtrampo FOREIGN KEY (cdTrampo) REFERENCES trampo (cdTrampo)
);

COMMENT ON TABLE avaliacao IS 'Histórico de avaliação do usuário';
COMMENT ON COLUMN avaliacao.nuNota IS 'Número da avaliação, 0 a 5';
COMMENT ON COLUMN avaliacao.tpElogio IS 'Tipo do elogio';
COMMENT ON COLUMN avaliacao.nuTotalElogios IS 'Quantidade de elogios';
