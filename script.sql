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
