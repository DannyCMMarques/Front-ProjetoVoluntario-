import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/layout.tsx";
import Atividades from "./pages/Atividades";
import CadastroUsuario from "./pages/CadastroUsuarios";
import Dashboard from "./pages/Dashboard";
import { default as ListarUsuariosPage, default as ListaUsuarios } from "./pages/ListaUsuarios";
import Login from "./pages/Login";
import Usuarios from "./pages/Usuarios";
import { UserProvider } from "./utils/context/useContext/useUserContext.tsx";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

function AuthOnlyRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("access_token");

  if (token) {
    return <Navigate to="/home" />;
  }

  return children;
}

function App() {
  const location = useLocation();
  const rotasSemMenuLateral = ["/login", "/cadastro"];
  const menuLateralVisivel = !rotasSemMenuLateral.includes(location.pathname);

  return (
    <>
      {menuLateralVisivel ? (
        <Layout>
          <Routes>
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/meu-perfil"
              element={
                <ProtectedRoute>
                  <Usuarios />
                </ProtectedRoute>
              }
            />
            <Route
              path="/idoso"
              element={
                <ProtectedRoute>
                  <ListaUsuarios />
                </ProtectedRoute>
              }
            />
            <Route
              path="/voluntario"
              element={
                <ProtectedRoute>
                  <ListarUsuariosPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/agenda"
              element={
                <ProtectedRoute>
                  <Atividades />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route
            path="/login"
            element={
              <AuthOnlyRoute>
                <Login />
              </AuthOnlyRoute>
            }
          />
          <Route
            path="/cadastro"
            element={
              <AuthOnlyRoute>
                <CadastroUsuario />
              </AuthOnlyRoute>
            }
          />
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
