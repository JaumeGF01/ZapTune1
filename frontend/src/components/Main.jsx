import { useState } from 'react';
import Releases from './Releases'
import Evento from './Evento'
import BarraRepro from './BarraRepro'
import SlidePanel from './SlidePanel';
import Lanzamiento from './Lanzamiento';
import Artista from './Artista';

const Main = () => {
  const [panel, setPanel] = useState({ open: false, mode: null });
  
  const openPanel = (mode, data) => setPanel({ open: true, mode, data });
  const closePanel = () => setPanel({ open: false, mode: null });
  
  return (
    
    <div className='mt-6 w-full'>
        <Evento/>
        <Releases onOpenPanel={openPanel}/>
          <SlidePanel isOpen={panel.open} position='left' mode={panel.mode} onClose={closePanel}>
            {panel.mode === 'lanz' && (
              <Lanzamiento lanz={panel.data}
               onOpenPanel={(mode, data) => setPanel({ open: true,  mode, data })} />)}
            {panel.mode === 'artista' && (
              <Artista artista={panel.data} 
               onOpenPanel={(mode, data) => setPanel({ open: true,  mode, data })} />)}
          </SlidePanel>
        <BarraRepro/>

    </div>
  )
}

export default Main