import useApiInterceptor from "./intercerptor";

function UsuarioService() {
  const api = useApiInterceptor();
  const urlBase ="/usuarios"

  async function cadastrarUsuario(payload: object) {
    return api.post(urlBase, payload);
  }

  async function filtrarUsuariosTipo(tipo: string, page: number = 0, size: number = 10) {
    return api.get(`${urlBase}`, {
      params: { tipo, page, size } // Adiciona paginação
    });
  }

  async function exibirUsuarioPorId(id: number) {
    return api.get(`${urlBase}/${id}`);
  }

  async function exibirUsuarioConectado() {
    return api.get(`${urlBase}/listaUsuario`);
  }
  async function excluirUsuariosPorId(id:number) {
    return api.delete(`${urlBase}/${id}`);
  }

  async function atualizarUsuarioPorId(id: number, payload: object) {
    return api.put(`${urlBase}/${id}`, payload);
  }

  // async function listarUsuarioPorTipo() {
  //   return api.get(`${urlBase}/listaUsuario`);
  // }

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
