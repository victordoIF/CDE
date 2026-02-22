import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import dotenv from 'dotenv';

dotenv.config();

async function setup() {
    const dbFile = process.env.DB_FILE || './data/estoque.db';

    const db = await open({
        filename: dbFile,
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario TEXT UNIQUE,
            senha TEXT,
            perfil TEXT CHECK(perfil IN ('admin', 'estoquista', 'consulta'))
        );

        CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            quantidade INTEGER DEFAULT 0,
            minimo INTEGER DEFAULT 5
        );

        CREATE TABLE IF NOT EXISTS movimentacoes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            produto_id INTEGER,
            tipo TEXT CHECK(tipo IN ('entrada', 'saida')),
            quantidade INTEGER,
            data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
            usuario_id INTEGER,
            FOREIGN KEY (produto_id) REFERENCES produtos(id),
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        );
    `);

    const adminExistente = await db.get("SELECT * FROM usuarios WHERE usuario = 'admin'");
    if (!adminExistente) {
        await db.run(
            "INSERT INTO usuarios (usuario, senha, perfil) VALUES (?, ?, ?)",
            ['admin', 'admin123', 'admin']
        );
        console.log("Utilizador admin criado com sucesso!");
    }

    console.log("Estrutura do banco de dados pronta!");
}

setup();