CREATE DATABASE IF NOT EXISTS mycommiserate;
USE mycommiserate;

CREATE TABLE usuarios (
    id_usuario int AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(255),
    senha VARCHAR(255),
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE anotacoes (
    id_anotacao int AUTO_INCREMENT PRIMARY KEY,
    id_usuario int,
    titulo VARCHAR(255),
    anotacao VARCHAR(255),
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE pastas (
    id_pasta int AUTO_INCREMENT PRIMARY KEY,
    id_usuario int,
    nome VARCHAR(255),
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

DELIMITER //
CREATE TRIGGER before_insert_usuarios
BEFORE INSERT ON usuarios
FOR EACH ROW
BEGIN
    IF (NEW.usuario IS NULL OR NEW.usuario = '') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'O campo "usuario" não pode ser NULL ou vazio.';
    END IF;
    IF (NEW.senha IS NULL OR NEW.senha = '') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'O campo "senha" não pode ser NULL ou vazio.';
    END IF;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER before_insert_anotacoes
BEFORE INSERT ON anotacoes
FOR EACH ROW
BEGIN
    IF (NEW.titulo IS NULL OR NEW.titulo = '') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'O campo "titulo" não pode ser NULL ou vazio.';
    END IF;
    IF (NEW.anotacao IS NULL OR NEW.anotacao = '') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'O campo "anotacao" não pode ser NULL ou vazio.';
    END IF;
END;
//
DELIMITER ;

ALTER TABLE usuarios
ADD CONSTRAINT uk_usuario UNIQUE (usuario);

ALTER TABLE anotacoes
ADD COLUMN id_pasta int,
ADD FOREIGN KEY (id_pasta) REFERENCES pastas(id_pasta);


