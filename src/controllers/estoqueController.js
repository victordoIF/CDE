import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPromise = open({
    filename: process.env.DB_FILE || './data/estoque.db',
    driver: sqlite3.Database
});

export const listarProdutos = async (req, res) => {
    const db = await dbPromise;
    const produtos = await db.all("SELECT * FROM produtos");
    res.json(produtos);
};

export const criarProduto = async (req, res) => {
    const { nome, minimo } = req.body;
    const db = await dbPromise;
    try {
        await db.run("INSERT INTO produtos (nome, quantidade, minimo) VALUES (?, 0, ?)", [nome, minimo]);
        res.status(201).json({ message: 'Produto criado com sucesso' });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar produto' });
    }
};

export const realizarMovimentacao = async (req, res) => {
    const { produto_id, tipo, quantidade } = req.body;
    const usuario_id = req.user.id;
    const db = await dbPromise;

    if (quantidade <= 0) {
        return res.status(400).json({ error: 'A quantidade deve ser um valor positivo' });
    }

    const produto = await db.get("SELECT * FROM produtos WHERE id = ?", [produto_id]);
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });

    if (tipo === 'saida') {
        if (produto.quantidade < quantidade) {
            return res.status(400).json({ error: 'Quantidade insuficiente em estoque' });
        }
        await db.run("UPDATE produtos SET quantidade = quantidade - ? WHERE id = ?", [quantidade, produto_id]);
    } else {
        await db.run("UPDATE produtos SET quantidade = quantidade + ? WHERE id = ?", [quantidade, produto_id]);
    }

    await db.run(
        "INSERT INTO movimentacoes (produto_id, tipo, quantidade, usuario_id) VALUES (?, ?, ?, ?)",
        [produto_id, tipo, quantidade, usuario_id]
    );

    res.status(201).json({ message: `Movimentação de ${tipo} registrada com sucesso` });
};

export const relatorioBaixoEstoque = async (req, res) => {
    const db = await dbPromise;
    const produtosCriticos = await db.all(
        "SELECT * FROM produtos WHERE quantidade <= minimo"
    );
    res.json(produtosCriticos);
};

export const excluirProduto = async (req, res) => {
    const db = await dbPromise;
    try {
        const result = await db.run("DELETE FROM produtos WHERE id = ?", [req.params.id]);
        if (result.changes === 0) return res.status(404).json({ error: 'Produto não encontrado' });
        res.json({ message: 'Produto removido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir produto' });
    }
};