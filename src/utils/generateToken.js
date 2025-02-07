const crypto = require('crypto');
console.log(crypto.randomBytes(64).toString('hex')); // Generates a 64-byte hex string

const jwt = require('jsonwebtoken');
const token = jwt.sign(
  { userId: 1, email: 'user@example.com', role: 'user' },
  'your_jwt_secret_key',
  { expiresIn: '1h' }
);
console.log('Generated Token:', token);
