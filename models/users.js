const db = require('../database');

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

module.exports = {
  createUser,
}