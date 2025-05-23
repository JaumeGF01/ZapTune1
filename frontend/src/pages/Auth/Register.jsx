import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({
    nombre: '',
    mail: '',
    password: '',
    password_confirmation: '',
    rol: '',
    bio: '',
    avatar: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.avatar === '') {
      form.avatar = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png';
    }
    try {
      await register(form);
      setSuccess("Registrado correctamente");
    } catch (err) {
      if (err.response?.data?.errors) {
        const firstError = Object.values(err.response.data.errors)[0][0];
        setError(firstError);
      } else {
        setError('Error al registrar');
      }
    }
    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Registro</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="nombre"
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="mail"
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="password_confirmation"
          type="password"
          placeholder="Confirmar contraseña"
          value={form.password_confirmation}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="rol"
          value={form.rol}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="" disabled>Selecciona un rol</option>
          <option value="artista">Artist</option>
          <option value="oyente">Listener</option>
        </select>

        <textarea
          name="bio"
          placeholder="Bio"
          value={form.bio}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="avatar"
          type="text"
          placeholder="Avatar"
          value={form.avatar}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Registrarse
        </button>
      </form>
    </div>
  );
}
