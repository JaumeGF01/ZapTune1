import { useState } from 'react';
import Header from '../components/header'
import SlidePanel from '../components/SlidePanel';
import Login from './Auth/Login';
import Register from './Auth/Register';
import UserPanel from './Auth/UserPanel';
import Main from '../components/Main';
import Footer from '../components/Footer';
import EditProfile from './Auth/EditProfile';
import UploadSong from './Auth/NewRelease';

export default function Home() {
  const [panel, setPanel] = useState({ open: false, mode: null });

  const openPanel = (mode) => setPanel({ open: true, mode });
  const closePanel = () => setPanel({ open: false, mode: null });

  return (
    <div className='bg-white flex flex-col items-center h-screen w-screen font-sans m-0 p-0 box-border'>
      <Header onOpenPanel={openPanel} />
      
      <SlidePanel isOpen={panel.open} position='right' mode={panel.mode} onClose={closePanel}>
        {panel.mode === 'login' && <Login onClose={closePanel}/>}
        {panel.mode === 'register' && <Register />}
        {panel.mode === 'user' && <UserPanel onClose={closePanel}/>}
        {panel.mode === 'edit-profile' && <EditProfile onClose={closePanel} />}
        {panel.mode === 'upload' && <UploadSong onClose={closePanel} />}
      </SlidePanel>
      <Main/>
      
      <Footer/>
    </div>
  );
}

