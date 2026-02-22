import jwt from 'jsonwebtoken';

export const autenticar = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Token inválido ou expirado.' });
        
        req.user = decoded; 
        next();
    });
};

export const permitir = (...perfisPermitidos) => {
    return (req, res, next) => {
        if (!perfisPermitidos.includes(req.user.perfil)) {
            return res.status(403).json({ error: 'Acesso negado para o seu perfil.' });
        }
        next();
    };
};