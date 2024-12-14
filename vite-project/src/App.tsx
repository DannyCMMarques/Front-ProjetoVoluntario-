import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/layout";
import Atividades from "./pages/Atividades";
import CadastroUsuario from "./pages/CadastroUsuarios";
import Dashboard from "./pages/Dashboard";
import ListaUsuarios from "./pages/ListaUsuarios";
import Login from "./pages/Login";
import Usuarios from "./pages/Usuarios";
import { ThemeProvider } from "./utils/context/ThemeContext/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
          <Route element={<Layout />}>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/usuario" element={<Usuarios />} />
            <Route path="/usuario/*" element={<Usuarios />} />
            <Route path="/idosos" element={<ListaUsuarios />} />
            <Route path="/voluntarios" element={<ListaUsuarios />} />
            <Route path="/minhas-atividades" element={<Atividades />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
