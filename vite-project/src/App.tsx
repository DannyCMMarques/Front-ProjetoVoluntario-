import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/layout.tsx";
import Atividades from "./pages/Atividades";
import CadastroUsuario from "./pages/CadastroUsuarios";
import Dashboard from "./pages/Dashboard";
import { default as ListarUsuariosPage, default as ListaUsuarios } from "./pages/ListaUsuarios";
import Login from "./pages/Login";
import Usuarios from "./pages/Usuarios";
import { UserProvider } from "./utils/context/useContext/useUserContext.tsx";

function App() {
  const location = useLocation();
  const rotasSemMenuLateral = ["/login", "/cadastro"];
  const menuLateralVisivel = !rotasSemMenuLateral.includes(location.pathname);

  return (
    <>
      {menuLateralVisivel ? (
        <Layout>
          <Routes>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/meu-perfil" element={<Usuarios />} />
            <Route path="/idoso" element={<ListaUsuarios />} />
            <Route path="/voluntario" element={<ListarUsuariosPage />} />
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
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  );
}
