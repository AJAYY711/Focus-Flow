import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { api } from '@/lib/api';
import { useAuth } from './AuthContext';

const TaskContext = createContext({
  tasks: [],
  stats: null,
  loading: true,
  activeFilter: 'today',
  searchQuery: '',
  priorityFilter: 'all',
  reminder: null,
  setActiveFilter: () => {},
  setSearchQuery: () => {},
  setPriorityFilter: () => {},
  fetchTasks: async () => {},
  fetchStats: async () => {},
  createTask: async () => {},
  updateTask: async () => {},
  deleteTask: async () => {},
  toggleComplete: async () => {},
  dismissReminder: () => {},
});

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('today');
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [reminder, setReminder] = useState(null);
  const timersRef = useRef([]);

  const fetchTasks = useCallback(async () => {
    if (!user) return;
    try {
      const params = new URLSearchParams();
      if (activeFilter && activeFilter !== 'all') params.set('filter', activeFilter);
      if (searchQuery) params.set('search', searchQuery);
      if (priorityFilter && priorityFilter !== 'all') params.set('priority', priorityFilter);
      const { data } = await api.get(`/tasks?${params.toString()}`);
      if (data.success) setTasks(data.tasks);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    } finally {
      setLoading(false);
    }
  }, [user, activeFilter, searchQuery, priorityFilter]);

  const fetchStats = useCallback(async () => {
    if (!user) return;
    try {
      const { data } = await api.get('/tasks/stats');
      if (data.success) setStats(data.stats);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }, [user]);

  const createTask = async (taskData) => {
    const { data } = await api.post('/tasks', taskData);
    if (data.success) {
      await fetchTasks();
      await fetchStats();
      scheduleReminder(data.task);
    }
    return data;
  };

  const updateTask = async (id, taskData) => {
    const { data } = await api.put(`/tasks/${id}`, taskData);
    if (data.success) {
      await fetchTasks();
      await fetchStats();
    }
    return data;
  };

  const deleteTask = async (id) => {
    const { data } = await api.delete(`/tasks/${id}`);
    if (data.success) {
      await fetchTasks();
      await fetchStats();
    }
    return data;
  };

  const toggleComplete = async (id, completed) => {
    return updateTask(id, { completed });
  };

  const dismissReminder = () => setReminder(null);

  // ── Reminder scheduling ──
  const scheduleReminder = useCallback((task) => {
    if (!task.reminder || task.completed || !task.date || !task.time) return;
    const taskDateTime = new Date(`${task.date}T${task.time}`);
    const reminderTime = new Date(taskDateTime.getTime() - task.reminder * 60 * 1000);
    const now = new Date();
    const delay = reminderTime.getTime() - now.getTime();
    if (delay <= 0) return;

    const timer = setTimeout(() => {
      setReminder(task);
      // Browser notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`⏰ ${task.title}`, {
          body: `Starting in ${task.reminder} minutes${task.description ? ` — ${task.description}` : ''}`,
          icon: '/favicon.ico',
        });
      }
    }, delay);

    timersRef.current.push(timer);
  }, []);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Fetch tasks when filter/search/user changes
  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchTasks();
      fetchStats();
    } else {
      setTasks([]);
      setStats(null);
      setLoading(false);
    }
  }, [user, activeFilter, searchQuery, priorityFilter, fetchTasks, fetchStats]);

  // Schedule reminders for upcoming tasks
  useEffect(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    tasks.forEach(scheduleReminder);
    return () => timersRef.current.forEach(clearTimeout);
  }, [tasks, scheduleReminder]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        stats,
        loading,
        activeFilter,
        searchQuery,
        priorityFilter,
        reminder,
        setActiveFilter,
        setSearchQuery,
        setPriorityFilter,
        fetchTasks,
        fetchStats,
        createTask,
        updateTask,
        deleteTask,
        toggleComplete,
        dismissReminder,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
