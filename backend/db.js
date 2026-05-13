const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'db.json');

function readDB() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify({ users: [] }));
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return { users: [] };
  }
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

module.exports = {
  getUsers: () => readDB().users,
  saveUser: (user) => {
    const db = readDB();
    const existing = db.users.findIndex(u => u.id === user.id || u.email === user.email);
    if (existing > -1) {
      db.users[existing] = { ...db.users[existing], ...user };
    } else {
      db.users.push(user);
    }
    writeDB(db);
  },
  getUserByEmail: (email) => {
    const db = readDB();
    return db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },
  getUserById: (id) => {
    const db = readDB();
    return db.users.find(u => u.id === id);
  }
};
