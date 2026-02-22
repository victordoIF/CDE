export const registarMovimentacao = async (req, res) => {
    const { produto_id, tipo, quantidade } = req.body;
    const usuario_id = req.user.id;
    const db = await dbPromise;

    const produto = await db.get("SELECT * FROM produtos WHERE id = ?", [produto_id]);
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });

    if (tipo === 'saida') {
        if (produto.quantidade < quantidade) {
            return res.status(400).json({ error: 'Estoque insuficiente' });
        }
        await db.run("UPDATE produtos SET quantidade = quantidade - ? WHERE id = ?", [quantidade, produto_id]);
    } else {
        await db.run("UPDATE produtos SET quantidade = quantidade + ? WHERE id = ?", [quantidade, produto_id]);
    }

    await db.run(
        "INSERT INTO movimentacoes (produto_id, tipo, quantidade, usuario_id) VALUES (?, ?, ?, ?)",
        [produto_id, tipo, quantidade, usuario_id]
    );

    res.status(201).json({ message: `Movimentação de ${tipo} concluída` });
};