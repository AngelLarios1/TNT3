import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Registro from './Registro'; // Importa el componente Registro
import Inicio from './inicio/inicio';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registro" element={<Registro />} /> {/* Ruta para Registro */}
        <Route path="/inicio/inicio" element={<Inicio/>} />
      </Routes>
    </Router>
  );
}

export default App;
