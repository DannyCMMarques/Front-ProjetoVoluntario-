import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import CadastroUsuario from './pages/CadastroUsuarios';
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from './pages/Login';
import { ThemeProvider } from "./utils/context/ThemeContext/ThemeContext";

function App() {

  return (
    <>
            <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
          <Route path="/dashboard" element={<Dashboard/>} />

      </Routes>
      </BrowserRouter>
      </ThemeProvider>

    </>
  )
}

export default App
