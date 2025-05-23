import { useEffect, useRef, useState } from 'react';
import { getReleases } from '../api/releases';
import { FaPlay, FaPause, FaForward, FaBackward, FaRandom, FaRedo, FaHeart, FaList, FaAlignLeft } from 'react-icons/fa';

export default function PlayerBar() {
  // Estado interno de la lista de pistas
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [loop, setLoop] = useState(false);
  const audioRef = useRef(null);

  
  // Cargar lanzamientos del backend como playlist
  useEffect(() => {
    getReleases().then(data => {
      const base = 'http://127.0.0.1:8000/storage/';
      const tracks = data.map(item => ({
        audioUrl: base + item.cancion,
        coverUrl: base + item.portada,
        title: item.titulo,
        artist: item.artista.nombre
      }));
      setPlaylist(tracks);
    });
  }, []);

  const track = playlist[currentIndex] || {};

  // Configurar evento de audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onLoaded = () => setDuration(audio.duration);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onEnded = () => loop ? audio.play() : handleNext();

    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, [currentIndex, loop, playlist]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    isPlaying ? audio.pause() : audio.play();
    setIsPlaying(!isPlaying);
  };

  const handlePrev = () => {
    if (!playlist.length) return;
    let idx = currentIndex - 1;
    if (idx < 0) idx = playlist.length - 1;
    setCurrentIndex(idx);
    setIsPlaying(true);
    setTimeout(() => audioRef.current.play(), 0);
  };

  const handleNext = () => {
    if (!playlist.length) return;
    let idx = shuffle
      ? Math.floor(Math.random() * playlist.length)
      : currentIndex + 1;
    if (idx >= playlist.length) idx = 0;
    setCurrentIndex(idx);
    setIsPlaying(true);
    setTimeout(() => audioRef.current.play(), 0);
  };

  const formatTime = (sec = 0) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 h-18 w-full bg-black text-white flex justify-around items-center z-50">
      <audio ref={audioRef} src={track.audioUrl} preload="metadata" />

      {/* Controles */}
      <span className="flex items-center gap-4">
        <button onClick={handlePrev}><FaBackward className="max-h-7" /></button>
        <button onClick={togglePlay} className="max-h-7 text-yellow-400">
          {isPlaying
            ? <FaPause/>
            : <FaPlay />
          }
        </button>
        <button onClick={handleNext}><FaForward className="max-h-7" /></button>
        <button onClick={() => setShuffle(!shuffle)}>
          <FaRandom className={`max-h-7 ${shuffle ? 'text-yellow-400' : ''}`} />
        </button>
        <button onClick={() => setLoop(!loop)}>
          <FaRedo className={`max-h-7 ${loop ? 'text-yellow-400' : ''}`} />
        </button>
      </span>

      {/* Barra de progreso */}
      <span className="flex items-center gap-4">
        <p className="text-sm w-12 text-center">{formatTime(currentTime)}</p>
        <div className="bg-white h-0.5 w-80 relative">
          <div
            className="bg-yellow-400 h-0.5"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p className="text-sm w-12 text-center">{formatTime(duration)}</p>
      </span>

      {/* Info pista */}
      <span className="flex items-center gap-4">
        <img
          src={track.coverUrl}
          alt={track.title}
          className="max-h-10 rounded-full aspect-square object-cover"
        />
        <div className="flex flex-col">
          <p className="text-sm">{track.title}</p>
          <p className="text-xs text-gray-400">{track.artist}</p>
        </div>
      </span>

      {/* Acciones extra */}
      <span className="flex items-center gap-4">
        <FaHeart className="max-h-7" />
        <FaAlignLeft className="max-h-7" />
        <FaList className="max-h-7" />
      </span>
    </div>
  );
}
