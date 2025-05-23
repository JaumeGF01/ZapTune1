import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Login({onClose}) {
  const { login } = useAuth();
  const [form, setForm] = useState({ mail: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      onClose();
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="mail" placeholder='email' className='w-full p-2 border rounded' onChange={e => setForm({ ...form, mail: e.target.value })} />
        <input name="password" placeholder='password' className='w-full p-2 border rounded' type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">Entrar</button>
      </form>
    </div>
  );
}
