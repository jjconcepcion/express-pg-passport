const db = require('../database');
const bcrypt = require('bcryptjs');

function createUser(email, username, password) {
  const query = {
    text:`
    INSERT INTO users(email, username, password_hash)
    VALUES($1, $2, $3)
    RETURNING id, email, username
    `,
    values: [email, username, password],
  };
  return db.query(query);
}

function findByUsername(username) {
  const query = {
    text: `
    SELECT * FROM users
    WHERE username = $1
    `,
    values: [username],
  }
  return db.query(query);
}

function generatePasswordHash(plaintextPassword) {
  const saltRounds = 10;
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        reject(err);
      } else {
        bcrypt.hash(plaintextPassword, salt, (err, hash) => {
          if (err) {
            reject(err);
          } else {
            resolve(hash);
          }
        });
      }
    });
  });
}

function verifyPassword(plaintextPassword, passwordHash) {
  return bcrypt.compare(plaintextPassword, passwordHash);
}

module.exports = {
  createUser,
  generatePasswordHash,
  findByUsername,
  verifyPassword,
}