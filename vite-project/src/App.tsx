import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout";
import Atividades from "./pages/Atividades";
import CadastroUsuario from "./pages/CadastroUsuarios";
import Dashboard from "./pages/Dashboard";
import ListaUsuarios from "./pages/ListaUsuarios";
import Login from "./pages/Login";
import Usuarios from "./pages/Usuarios";

function App() {
  const location = useLocation();
  const rotasSemMenuLateral = ["/login", "/cadastro"];
  const menuLateralVisivel = !rotasSemMenuLateral.includes(location.pathname);

  return (
    <>
      {menuLateralVisivel ? (
        <Layout>
          <Routes>
            <Route path="/inicio" element={<Dashboard />} />
            <Route path="/usuario" element={<Usuarios />} />
            <Route path="/idosos" element={<ListaUsuarios />} />
            <Route path="/voluntarios" element={<ListaUsuarios />} />
            <Route path="/agenda" element={<Atividades />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
        </Routes>
      )}
    </>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
