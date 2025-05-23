import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Ayuda from './pages/Ayuda';
import Home from './pages/Home';
import './my.css'
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ayuda/:seccion" element={<Ayuda />} />
      </Routes>
    </Router>
  );
}