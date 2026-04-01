CREATE DATABASE eventos_academicosDB;

USE eventos_academicosDB;

CREATE TABLE
    Evento (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        data_inicio DATE NOT NULL,
        data_fim DATE NOT NULL,
        local VARCHAR(100) NOT NULL,
        cidade VARCHAR(50) NOT NULL,
        capacidade INT NOT NULL CHECK (capacidade > 0),
        status ENUM ('planeado', 'ativo', 'encerrado', 'cancelado') default 'planeado' NOT NULL,
        preco_inscricao DECIMAL(10, 2) NOT NULL CHECK (preco_inscricao >= 0)
    );

CREATE TABLE
    Participante (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        telefone VARCHAR(20) UNIQUE NOT NULL
    );

CREATE TABLE
    Orador (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        especialidade VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        telefone VARCHAR(20) UNIQUE NOT NULL
    );

CREATE TABLE
    Sessao (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(100) NOT NULL,
        data_hora DATETIME NOT NULL,
        id_evento INT NOT NULL,
        id_orador INT NOT NULL,
        FOREIGN KEY (id_evento) REFERENCES Evento (id),
        FOREIGN KEY (id_orador) REFERENCES Orador (id)
    );

CREATE TABLE
    Inscricao (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        id_participante INT NOT NULL,
        id_evento INT NOT NULL,
        data_inscricao DATE NOT NULL,
        status_pagamento ENUM ('pendente', 'pago', 'cancelado') NOT NULL DEFAULT 'pendente',
        UNIQUE (id_participante, id_evento),
        FOREIGN KEY (id_participante) REFERENCES Participante (id),
        FOREIGN KEY (id_evento) REFERENCES Evento (id)
    );