import React from 'react';
import logo from '../assets/logoM_Oscuro.png';
import { useAuth } from '../context/AuthContext';

const Header = ({ onOpenPanel }) => {
  const { user } = useAuth();

  return (
    <header className="relative flex items-center justify-between mt-6 w-4/5 h-10 px-4 bg-black rounded-lg">
      <span className="w-1/5"></span>
      <img src={logo} alt="logo" className="logo cursor-pointer" onClick={()=> location.reload()} />
      <input
        type="search"
        placeholder="Artista, Disco, Canción..."
        className="rounded-full bg-white py-2 px-3 outline-none border-none w-1/4 h-6"
      />
      <div className="flex items-center justify-end h-10 min-w-1/5">
        {user ? (
          <div onClick={() => onOpenPanel('user')} className="flex items-center cursor-pointer space-x-2 p-0.5 pr-2 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white">
            <img
              src={user.avatar || 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png'}
              alt="Avatar"
              className="w-8 h-8 rounded-full object-contain"
            />
            <span className="text-sm">{user.nombre}</span>
          </div>
        ) : (
          <>
            <button
              onClick={() => onOpenPanel('login')}
              className="bg-gray-300 hover:brightness-110 text-black rounded-md px-3 cursor-pointer h-6"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => onOpenPanel('register')}
              className="bg-yellow-400 hover:brightness-110 text-black rounded-md px-3 ml-2 cursor-pointer h-6"
            >
              Registrarse
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
