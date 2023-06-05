const jwt = require('jsonwebtoken');
const NotAuthError = require('../errors/NotAuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const HeaderAuth = req.get('Authorization');

  if (!HeaderAuth) {
    next(new NotAuthError('Необходима авторизация'));
  }

  const token = HeaderAuth.split(' ')[1];

  if (!token) {
    next(new NotAuthError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production'
        ? JWT_SECRET
        : '9198ad99c86faa69436dbd8602f720c5e5d3b33f4958c399e7c278a54a9721dc',
    );
  } catch (err) {
    next(new NotAuthError('Необходима авторизация'));
  }

  req.user = payload;
  next();
};
