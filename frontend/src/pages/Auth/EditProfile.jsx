import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { update } from '../../api/auth';

const EditProfile = () => {
  const { user,setUser } = useAuth();
  const [form, setForm] = useState({
    nombre: user.nombre,
    bio: user.bio || '',
    avatar: user.avatar || ''
  });

  const [message, setMessage] = useState(null);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Editar perfil:', form);
    try{
      const updated = await update(form);
      setUser(updated);
      setMessage("Perfil actualizado");
    }catch(err){
      const msg = err.response?.data?.message
      if(err.response?.data?.message)
      setMessage(msg);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {message && <p className="text-red-500 mb-2">{message}</p>}
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <textarea
        name="bio"
        placeholder="Bio"
        value={form.bio}
        onChange={handleChange}
        className="w-full p-2 border rounded "
      />
      <input
        type="text"
        name="avatar"
        placeholder="URL del avatar"
        value={form.avatar}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Guardar cambios
      </button>
    </form>
  );
};

export default EditProfile;
