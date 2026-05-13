const express = require('express');
const db = require('../db');
const verifyToken = require('../middleware');

const router = express.Router();

// ── GET /api/tasks — List tasks for authenticated user ──
router.get('/', verifyToken, (req, res) => {
  const tasks = db.getTasksByUser(req.userId);
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  const { filter, search, priority } = req.query;

  let filtered = tasks;

  // Search filter
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      t => t.title.toLowerCase().includes(q) || (t.description || '').toLowerCase().includes(q)
    );
  }

  // Priority filter
  if (priority && priority !== 'all') {
    filtered = filtered.filter(t => t.priority === priority);
  }

  // Category filter
  if (filter === 'today') {
    filtered = filtered.filter(t => !t.completed && t.date === todayStr);
  } else if (filter === 'upcoming') {
    filtered = filtered.filter(t => !t.completed && t.date > todayStr);
  } else if (filter === 'completed') {
    filtered = filtered.filter(t => t.completed);
  } else if (filter === 'missed') {
    filtered = filtered.filter(t => {
      if (t.completed) return false;
      if (t.date < todayStr) return true;
      if (t.date === todayStr && t.time) {
        const [h, m] = t.time.split(':').map(Number);
        const taskTime = new Date(now);
        taskTime.setHours(h, m, 0, 0);
        return taskTime < now;
      }
      return false;
    });
  }

  // Sort: nearest upcoming first, completed last
  filtered.sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    const da = `${a.date}T${a.time || '23:59'}`;
    const db2 = `${b.date}T${b.time || '23:59'}`;
    return da.localeCompare(db2);
  });

  res.json({ success: true, tasks: filtered });
});

// ── GET /api/tasks/stats — Dashboard statistics ──
router.get('/stats', verifyToken, (req, res) => {
  const tasks = db.getTasksByUser(req.userId);
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const productivity = total > 0 ? Math.round((completed / total) * 100) : 0;

  const todayTasks = tasks.filter(t => t.date === todayStr);
  const todayCompleted = todayTasks.filter(t => t.completed).length;

  const missed = tasks.filter(t => {
    if (t.completed) return false;
    if (t.date < todayStr) return true;
    if (t.date === todayStr && t.time) {
      const [h, m] = t.time.split(':').map(Number);
      const taskTime = new Date(now);
      taskTime.setHours(h, m, 0, 0);
      return taskTime < now;
    }
    return false;
  }).length;

  // Simple streak: count consecutive days (looking back) with at least 1 completed task
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const ds = d.toISOString().split('T')[0];
    const dayCompleted = tasks.some(t => t.date === ds && t.completed);
    if (dayCompleted) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }

  res.json({
    success: true,
    stats: {
      total,
      completed,
      pending,
      productivity,
      todayTotal: todayTasks.length,
      todayCompleted,
      missed,
      streak,
    },
  });
});

// ── POST /api/tasks — Create a new task ──
router.post('/', verifyToken, (req, res) => {
  const { title, description, date, time, priority, reminder } = req.body;

  if (!title || !date) {
    return res.status(400).json({ success: false, message: 'Title and date are required.' });
  }

  const task = {
    id: `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    userId: req.userId,
    title,
    description: description || '',
    date,
    time: time || '',
    priority: priority || 'medium',
    reminder: reminder || null,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  db.saveTask(task);
  res.json({ success: true, task });
});

// ── PUT /api/tasks/:id — Update a task ──
router.put('/:id', verifyToken, (req, res) => {
  const task = db.getTaskById(req.params.id);
  if (!task) {
    return res.status(404).json({ success: false, message: 'Task not found.' });
  }
  if (task.userId !== req.userId) {
    return res.status(403).json({ success: false, message: 'Unauthorized.' });
  }

  const { title, description, date, time, priority, reminder, completed } = req.body;
  const updated = {
    ...task,
    title: title !== undefined ? title : task.title,
    description: description !== undefined ? description : task.description,
    date: date !== undefined ? date : task.date,
    time: time !== undefined ? time : task.time,
    priority: priority !== undefined ? priority : task.priority,
    reminder: reminder !== undefined ? reminder : task.reminder,
    completed: completed !== undefined ? completed : task.completed,
  };

  db.saveTask(updated);
  res.json({ success: true, task: updated });
});

// ── DELETE /api/tasks/:id — Delete a task ──
router.delete('/:id', verifyToken, (req, res) => {
  const task = db.getTaskById(req.params.id);
  if (!task) {
    return res.status(404).json({ success: false, message: 'Task not found.' });
  }
  if (task.userId !== req.userId) {
    return res.status(403).json({ success: false, message: 'Unauthorized.' });
  }

  db.deleteTask(req.params.id);
  res.json({ success: true, message: 'Task deleted.' });
});

module.exports = router;
