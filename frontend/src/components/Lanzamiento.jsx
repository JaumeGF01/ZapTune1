import { useEffect, useRef, useState } from 'react';
import { FaPlay,FaPause } from 'react-icons/fa';


export default function Lanzamiento({ lanz, onOpenPanel }) {
  if (!lanz) return null;
  const storageBase = 'http://127.0.0.1:8000/storage/';
  const src = `${storageBase}${lanz.cancion}`;

  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audioRef.current = audio;
    const onLoaded = () => setDuration(audio.duration);
    audio.addEventListener('loadedmetadata', onLoaded);
    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.pause();
      audio.src = '';
    };
  }, [src]);

  const formatTime = sec => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handlePlayClick = () => {
    const audio = audioRef.current;
    if (!audio) return;
    isPlaying ? audio.pause() : audio.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <div className="flex items-end">
        <img
          src={`${storageBase}${lanz.portada}`}
          alt={lanz.titulo}
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="ml-4 flex-1 self-end">
          <h2 className="text-2xl font-bold">{lanz.titulo}</h2>
          <p className="text-sm text-gray-600 mt-1 cursor-pointer hover:text-yellow-400" onClick={()=>onOpenPanel('artista',lanz.artista)}>
            {lanz.artista.nombre}
          </p>
        </div>
      </div>

      <hr className="border-t my-6" />

      <div className="flex justify-between items-center p-2 bg-zinc-200 rounded-md">
        <button onClick={handlePlayClick}>
            {isPlaying
              ? <FaPause className="text-3xl text-yellow-400" />
              : <FaPlay className="text-3xl text-yellow-400" />
            }
        </button>
        <div className="flex-1 mx-4 overflow-hidden">
          <h4 className="truncate font-medium">{lanz.titulo}</h4>
          <p className="text-sm text-gray-600 truncate">{lanz.artista.nombre}</p>
        </div>
        <div className="w-12 text-right text-sm">
          {duration > 0 ? formatTime(duration) : '00:00'}
        </div>
      </div>
    </div>
  );
}
