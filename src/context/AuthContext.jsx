import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { api } from '@/lib/api';

const AuthContext = createContext({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  checkAuth: async () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const token = Cookies.get('auth_token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get('/auth/me');
      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
        Cookies.remove('auth_token');
      }
    } catch (err) {
      setUser(null);
      Cookies.remove('auth_token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    if (data.success) {
      Cookies.set('auth_token', data.token, { expires: 7 });
      setUser(data.user);
    }
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    if (data.success) {
      Cookies.set('auth_token', data.token, { expires: 7 });
      setUser(data.user);
    }
    return data;
  };

  const googleLogin = async () => {
    const { data } = await api.post('/auth/google-login');
    if (data.success) {
      Cookies.set('auth_token', data.token, { expires: 7 });
      setUser(data.user);
    }
    return data;
  };

  const logout = () => {
    Cookies.remove('auth_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, googleLogin, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
