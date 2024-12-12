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

          <Route
            path="/home"
            element={
              <Layout>
               <Dashboard/>
              </Layout>
            }
          />
          <Route
            path="/usuario"
            element={
              <Layout>
                <Usuarios />
              </Layout>
            }
          />
          <Route
            path="/usuario/*"
            element={
              <Layout>
                <Usuarios />
              </Layout>
            }
          />
          <Route
            path="/idosos"
            element={
              <Layout>
                <ListaUsuarios />
              </Layout>
            }
          />
          <Route
            path="/voluntarios"
            element={
              <Layout>
                <ListaUsuarios />
              </Layout>
            }
          />
          <Route
            path="/minhas-atividades"
            element={
              <Layout>
                <Atividades />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
