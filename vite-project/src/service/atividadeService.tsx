import useApiInterceptor from './intercerptor';

interface AtividadeId {
  id: number;
}

interface AtividadeFiltro {
  id: number;
}

function AtividadeService() {
  const api = useApiInterceptor();

  async function salvarAtividade(payload: object) {
    return api.post("/atividades", payload);
  }

  // async function exibirAtividadePorId({ id }: AtividadeId) {
  //   return api.get(`/atividades/${id}`);
  // }

  async function deletarAtividadePorId({ id }: AtividadeId) {
    return api.delete(`/atividades/${id}`);
  }

  async function atualizarAtividadePorId(id: number, payload: object) {
    return api.put(`/atividades/${id}`, payload);
  }

  async function MinhasAtividades({ id }: AtividadeFiltro) {
    return api.get(`/atividades/minhas-atividades/${id}`);
  }

  async function filtroAtividade({ id, queryParams }: { id: number; queryParams?: Record<string, any> }) {
    const queryString =
      queryParams && Object.keys(queryParams).length > 0
        ? "?" +
          Object.entries(queryParams)
            .map(([key, value]) => `${key}=${value}`)
            .join("&")
        : "";
    return api.get(`/atividades/minhas-atividades/${id}${queryString}`);
  }


  return {
    salvarAtividade,
    deletarAtividadePorId,
    atualizarAtividadePorId,
    MinhasAtividades,
    filtroAtividade
  };
}

export default AtividadeService;
