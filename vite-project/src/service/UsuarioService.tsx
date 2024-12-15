import { UsuarioId } from "../utils/interfaces/ServiceProps";
import useApiInterceptor from "./intercerptor";

function UsuarioService() {
  const api = useApiInterceptor();
  const urlBase ="/usuarios"

  async function cadastrarUsuario(payload: object) {
    return api.post(urlBase, payload);
  }

  async function filtrarUsuariosTipo(tipo: string) {
    return api.get(`${urlBase}`, { params: { tipo } });
  }

  async function exibirUsuarioPorId({ id }: UsuarioId) {
    return api.get(`${urlBase}/${id}`);
  }

  async function exibirUsuarioConectado() {
    return api.get(`${urlBase}/listaUsuario`);
  }
  async function excluirUsuariosPorId({ id }: UsuarioId) {
    return api.delete(`${urlBase}/${id}`);
  }

  async function atualizarUsuarioPorId(id: number, payload: object) {
    return api.put(`${urlBase}/${id}`, payload);
  }

  return {
    cadastrarUsuario,
    filtrarUsuariosTipo,
    exibirUsuarioPorId,
    excluirUsuariosPorId,
    atualizarUsuarioPorId,
    exibirUsuarioConectado,
  };
}

export default UsuarioService;
