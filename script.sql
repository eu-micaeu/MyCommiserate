CREATE DATABASE IF NOT EXISTS mycommiserate;
USE mycommiserate;

CREATE TABLE usuarios (
    id_usuario int AUTO_INCREMENT PRIMARY KEY,
    usuario TEXT,
    senha TEXT
);

CREATE TABLE anotacoes (
    id_anotacao int AUTO_INCREMENT PRIMARY KEY,
    id_usuario int,
    titulo TEXT,
    anotacao TEXT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE backup_anotacoes (
    id_anotacao int,
    id_usuario int,
    titulo TEXT,
    anotacao TEXT
);

DELIMITER //
CREATE TRIGGER backup_anotacoes_trigger
BEFORE DELETE ON anotacoes
FOR EACH ROW
BEGIN
    INSERT INTO backup_anotacoes VALUES (OLD.id_anotacao, OLD.id_usuario, OLD.titulo, OLD.anotacao);
END;//
DELIMITER ;

