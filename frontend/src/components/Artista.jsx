// src/components/Artista.jsx
import { useEffect, useState } from 'react';
import { getReleases } from '../api/releases';

export default function Artista({ artista , onOpenPanel}) {
  const [releases, setReleases] = useState([]);
  const storage = 'http://127.0.0.1:8000/storage/';

  useEffect(() => {
    if (!artista?.id) return;
    getReleases().then(data => {
      // Filtramos solo los lanzamientos de este artista
      const own = data.filter(r => r.artista.id === artista.id);
      setReleases(own);
    });
  }, [artista]);

  return (
    <div>
      <div className="flex flex-col items-start space-x-4 mb-6">
        
          <img
            src={`${artista.avatar}`}
            alt={artista.nombre}
            className="w-20 h-20 rounded-full object-cover"
          />
        
        <div>
          <h2 className="text-2xl font-bold">{artista.nombre}</h2>
        </div>
        <p>{artista.bio}</p>
      </div>
      
      <hr className="mb-4" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {releases.map(r => (
          <div 
            key={r.id}
            className="flex items-center space-x-2 p-2 bg-gray-100 rounded-lg shadow"
            onClick={() => onOpenPanel('lanz', r)}
          >
            <img
              src={`${storage}${r.portada}`}
              alt={r.titulo}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold truncate">{r.titulo}</p>
              <p className="text-xs text-gray-500">{r.tipo}</p>
            </div>
          </div>
        ))}
        {releases.length === 0 && (
          <p className="text-sm text-gray-500">Este artista aún no tiene lanzamientos.</p>
        )}
      </div>
    </div>
  );
}
