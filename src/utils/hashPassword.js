const bcrypt = require('bcryptjs');

// Replace 'yourpassword' with the plain text password you want to hash.
const plainPassword = 'password123';

bcrypt.hash(plainPassword, 10, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Hashed Password:', hash);
  }
});
