CREATE TABLE candidato
(
    cdCandidato     INTEGER NOT NULL,
    cdTrampo        INTEGER NOT NULL,
    nmVaga          TEXT NOT NULL,
    nmCandidato     TEXT NOT NULL,

    CONSTRAINT pk_candidato_trampo PRIMARY KEY (cdCandidato, cdTrampo),
    CONSTRAINT fk_candidato_trampo FOREIGN KEY (cdTrampo) REFERENCES trampo(cdTrampo)
);

COMMENT ON TABLE candidato IS 'Candidatos a um trabalho';
COMMENT ON COLUMN candidato.cdCandidato IS 'ID do Usuário que se candidatou';
COMMENT ON COLUMN candidato.cdTrampo IS 'ID do Trabalho que esta vágo';