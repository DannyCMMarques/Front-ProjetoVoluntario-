import useApiInterceptor from './intercerptor';

interface UsuarioFiltro {
  tipo: string;
}

interface UsuarioId {
  id: number;
}

function UsuarioService() {
  const api = useApiInterceptor();
   console.log(api);
  async function cadastrarUsuario(payload:object) {
    return api.post("/usuarios", payload);
  }

  async function filtrarUsuariosTipo({ tipo }: UsuarioFiltro) {
    return api.get(`/usuarios`, { params: { tipo } });
}

  async function exibirUsuarioPorId({ id }: UsuarioId) {
    return api.get(`/usuarios/${id}`);
  }

  async function excluirUsuariosPorId({id}: UsuarioId) {
    return api.delete(`/usuarios/${id}`)
  }

  async function atualizarUsuarioPorId(id: number , payload :object) {
    return api.put(`/usuarios/${id}`,payload);
  }

  return { cadastrarUsuario, filtrarUsuariosTipo, exibirUsuarioPorId, excluirUsuariosPorId, atualizarUsuarioPorId };
}

export default UsuarioService;