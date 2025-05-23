import { useEffect, useState } from 'react';
import {
  getReleases,
  populares,
  ultimos
} from '../api/releases';

export default function ReleasesTabs({onOpenPanel}) {
  // Definimos las pestañas con sus claves
  const tabs = [
    { key: 'ultimo',  label: 'Últimos Lanzamientos' },
    { key: 'all',     label: 'Explorar' },
    { key: 'popular', label: 'Más Escuchados' }
  ];

  // Estado combinado para evitar undefined
  const [data, setData] = useState({
    ultimo: [],
    all: [],
    popular: []
  });
  const [selected, setSelected] = useState(tabs[0].key); // por defecto 'latest'

  // Carga de datos
  useEffect(() => {
    ultimos().then(ultimo => setData(prev => ({ ...prev, ultimo })));
    getReleases().then(all     => setData(prev => ({ ...prev, all })));
    populares().then(popular => setData(prev => ({ ...prev, popular })));
  }, []);

  const storage = 'http://127.0.0.1:8000/storage/';

  // Seleccionamos el array actual o un array vacío si no existe
  const current = data[selected] || [];

  return (
    <div className="">
      {/* Menú horizontal de pestañas */}
      <div className="flex  mb-2 border-b bg-black w-screen justify-evenly p-2">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setSelected(tab.key)}
            className={`pb-2 font-medium hover:text-yellow-400 ${
              selected === tab.key ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido según pestaña seleccionada */}
      <div className="flex flex-wrap justify-between max-w-5/6 mx-auto">
        {current.map(lanzamiento => (
          <div
            key={lanzamiento.id}
            className="flex flex-col items-start p-4 w-48 m-2 bg-gray-100  rounded-lg shadow hover:shadow-md transition"
            onClick={() => onOpenPanel('lanz',lanzamiento)}
          >
            <img
              src={
                storage + lanzamiento.portada
              }
              alt={lanzamiento.titulo}
              className="rounded-full h-32 w-32 object-cover self-center mb-2"
            />
            <h3 className="text-sm font-semibold">
              {lanzamiento.titulo}
            </h3>
            <p
              className='text-xs text-gray-500 hover:text-yellow-400 cursor-pointer'
              onClick={e=>{
                e.stopPropagation();
                onOpenPanel('artista',lanzamiento.artista)
              }}>
                {lanzamiento.artista.nombre}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
