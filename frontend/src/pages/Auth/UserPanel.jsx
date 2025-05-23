import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import EditProfile from './EditProfile';
import UploadSong from './NewRelease';
import NuevoEvento from './NuevoEvento';

export default function UserPanel({ onClose }) {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('edit-profile');

  const handleLogout = () => {
    logout();
    onClose();
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'edit-profile':
        return <EditProfile />;
      case 'upload':
        return <UploadSong />;
      case 'create-evento':
        return <NuevoEvento />;
      default:
        return <div className="p-4 text-gray-500">Selecciona una opción del menú.</div>;
    }
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside className="w-34 flex-shrink-0">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-1">Hola, {user.nombre}</h2>
          <p className="text-sm text-gray-600 capitalize">{user.rol}</p>
        </div>
        <nav className="space-y-2">
          <button
            className={`w-full text-left  ${activeSection === 'edit-profile' ? 'border-b-2 border-yellow-400' : 'text-black border-b-2 hover:border-b-yellow-400'}`}
            onClick={() => setActiveSection('edit-profile')}
          >
            Editar perfil
          </button>
          {user.rol === 'artista' && (
            <>
              <button
                className={`w-full text-left ${activeSection === 'upload' ? 'border-b-2 border-yellow-400' : 'text-black border-b-2 hover:border-b-yellow-400'}`}
                onClick={() => setActiveSection('upload')}
              >
                Subir canción
              </button>
              <button
                className={`w-full text-left ${activeSection === 'create-evento' ? 'border-b-2 border-yellow-400' : 'text-black border-b-2 hover:border-b-yellow-400'}`}
                onClick={() => setActiveSection('create-evento')}
              >
                Crear evento
              </button>
            </>
          )}
        </nav>
        <div className="mt-auto pt-4">
          <button
            className="w-full text-left text-black border-b-2 hover:border-b-red-500"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-grow  p-6 overflow-auto">
        {renderSection()}
      </main>
    </div>
  );
}
