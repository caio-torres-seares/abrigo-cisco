module.exports = (req, res, next) => {
  if (!req.user.isEmployee) {
    return res.status(403).json({ message: 'Acesso negado. Apenas funcionários podem realizar esta ação.' });
  }
  next();
}; 