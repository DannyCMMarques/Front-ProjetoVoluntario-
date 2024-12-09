import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import CadastroUsuario from './pages/CadastroUsuarios';
import Login from './pages/Login';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />

      </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
