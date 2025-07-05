const pool = require("./pool");

async function getAllUsernames() {
  const { rows } = await pool.query("SELECT * FROM userdata");
  return rows;
}

async function insertUsername(username) {
  await pool.query("INSERT INTO userdata (username) VALUES ($1)", [username]);
}

module.exports = {
  getAllUsernames,
  insertUsername
};
