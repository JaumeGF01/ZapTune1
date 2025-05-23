import { useState } from 'react';
import { createEvento } from '../../api/eventos';

const NuevoEvento = () => {
  const [infoEvento, setinfoEvento] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    localizacion: '',
    imagen: null
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleChange = e => {
    const { name, value, files } = e.target;
    setinfoEvento({
      ...infoEvento,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titulo', infoEvento.titulo);
    formData.append('descripcion', infoEvento.descripcion);
    formData.append('web', infoEvento.web);
    formData.append('fecha', infoEvento.fecha);
    formData.append('localizacion', infoEvento.localizacion);
    formData.append('imagen', infoEvento.imagen);

    for (let [key, val] of formData.entries()) {
      console.log(key, val);
    }
    try {
        const res = await createEvento(formData);
        setSuccess("Evento creado correctamente");
    } catch (err) {
        console.error(err.response?.data.message);
        setError("Error al crear evento");
    }
    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}
      
      <input type="text" name="titulo" placeholder="Título del Evento" onChange={handleChange} className="w-full p-2 border rounded" /> 
      <input type="text" name="descripcion" placeholder="Descripción del Evento" onChange={handleChange} className="w-full p-2 border rounded" />
      <input type="text" name="web" placeholder="Web del Evento" onChange={handleChange} className="w-full p-2 border rounded" />
      <input type="date" name="fecha" placeholder="Fecha del Evento" onChange={handleChange} className="w-full p-2 border rounded" />
      <input type="text" name="localizacion" placeholder="Localización del Evento" onChange={handleChange} className="w-full p-2 border rounded" />
      <label htmlFor="imagen">Banner</label>
      <input type="file" id='imagen' name="imagen" accept="image/*" onChange={handleChange} className="w-full p-2 border rounded" />

      <button
        type="submit"
        className="w-full bg-green-600 text-white px-4 py-2 rounded"
      >
        Publicar Evento
      </button>
    </form>
  );
};

export default NuevoEvento;
