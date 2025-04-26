import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // guardamos el id del usuario para usarlo en las rutas
    next();
  } catch (error) {
    console.error('Error en verifyToken:', error.message);
    res.status(401).json({ message: 'Token inválido' });
  }
}
