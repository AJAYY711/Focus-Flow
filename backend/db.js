const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'db.json');

function readDB() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify({ users: [], tasks: [] }));
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    if (!parsed.tasks) parsed.tasks = [];
    return parsed;
  } catch (err) {
    return { users: [], tasks: [] };
  }
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

module.exports = {
  // ── User helpers ──
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
  },

  // ── Task helpers ──
  getTasksByUser: (userId) => {
    const db = readDB();
    return db.tasks.filter(t => t.userId === userId);
  },
  getTaskById: (taskId) => {
    const db = readDB();
    return db.tasks.find(t => t.id === taskId);
  },
  saveTask: (task) => {
    const db = readDB();
    const idx = db.tasks.findIndex(t => t.id === task.id);
    if (idx > -1) {
      db.tasks[idx] = { ...db.tasks[idx], ...task };
    } else {
      db.tasks.push(task);
    }
    writeDB(db);
    return task;
  },
  deleteTask: (taskId) => {
    const db = readDB();
    db.tasks = db.tasks.filter(t => t.id !== taskId);
    writeDB(db);
  },
};

