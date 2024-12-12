import useApiInterceptor from './intercerptor';

interface UsuarioFiltro {
  tipo: string;
}

interface UsuarioId {
  id: number;
}

function useUsuarioService() {
  const api = useApiInterceptor();
   console.log(api);
  async function cadastrarUsuario(payload:object) {
    return api.post("/usuarios", payload);
  }

  async function filtrarUsuarios({ tipo }: UsuarioFiltro) {
    return api.get(`/usuarios/${tipo}`);
  }

  async function exibirUsuarioPorId({ id }: UsuarioId) {
    return api.get(`/usuarios/${id}`);
  }

  return { cadastrarUsuario, filtrarUsuarios, exibirUsuarioPorId };
}

export default useUsuarioService;