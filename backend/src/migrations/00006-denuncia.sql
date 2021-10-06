CREATE TABLE denuncia
(
    cdDenuncia SERIAL  NOT NULL,
    cdUsuario  INTEGER NOT NULL,
    deMensagem TEXT    NOT NULL,

    CONSTRAINT pk_denuncia PRIMARY KEY (cdDenuncia),
    CONSTRAINT fk_denuncia_usuario FOREIGN KEY (cdUsuario) REFERENCES usuario (cdUsuario)
);

COMMENT ON TABLE denuncia IS 'Denuncias realiadas em cima de usuarios por outros usuários';
