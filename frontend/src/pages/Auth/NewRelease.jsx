import { useState } from 'react';
import { createRelease } from '../../api/releases';

const NewRelease = () => {
  const [releaseInfo, setReleaseInfo] = useState({
    titulo: '',
    portada: null,
    tipo: '', 
    cancion: null
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleChange = e => {
    const { name, value, files } = e.target;
    setReleaseInfo({
      ...releaseInfo,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titulo', releaseInfo.titulo);
    formData.append('tipo',  releaseInfo.tipo);
    formData.append('portada', releaseInfo.portada);
    formData.append('cancion', releaseInfo.cancion);
    //AAAAAAAAAAA
    for (let [key, val] of formData.entries()) {
      console.log(key, val);
    }
    try {
      const res = await createRelease(formData);
      setSuccess("Lanzamiento creado correctamente");
    } catch (err) {
      console.error(err.response?.data);
      setError("Error al crear lanzamiento");
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

      <input
        type="text"
        name="titulo"
        placeholder="Título del sencillo"
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
 <label htmlFor="portada">Portada</label>
      <input
        id='portada'
        type="file"
        name="portada"
        accept="image/*"
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <select name="tipo" value={releaseInfo.tipo} onChange={handleChange} className="w-full p-2 border rounded">
        <option value="" disabled>Selecciona un tipo</option>
        <option value="sencillo">Sencillo</option>
        <option value="ep" disabled>EP</option>
        <option value="album" disabled>Album</option>
      </select>
      <label htmlFor="cancion">Canción</label>
      <input
        id='cancion'
        type="file"
        name="cancion"
        accept="audio/*"
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white px-4 py-2 rounded"
      >
        Publicar sencillo
      </button>
    </form>
  );
};

export default NewRelease;
