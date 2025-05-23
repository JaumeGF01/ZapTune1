import { createContext, useState, useEffect, useContext } from 'react';
import { login as loginRequest, register as registerRequest, update as updateRequest } from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('usuario')) || null);
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');

    if (user) localStorage.setItem('usuario', JSON.stringify(user));
    else localStorage.removeItem('usuario');
  }, [token, user]);

  const login = async (credentials) => {
    const res = await loginRequest(credentials);
    setUser(res.data.user);
    setToken(res.data.token);
  };

  const register = async (data) => {
    await registerRequest(data);
    
  };
  const update = async (data) => {
    await updateRequest(data);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, update, logout, isAuth: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
