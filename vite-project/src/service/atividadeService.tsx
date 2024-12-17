import useApiInterceptor from './intercerptor';


interface AtividadeFiltro {
  id: number;
}

function AtividadeService() {
  const api = useApiInterceptor();

  async function salvarAtividade(payload: object) {
    return api.post("/atividades", payload);
  }

  async function exibirAtividadePorId( id:number ) {
    return api.get(`/atividades/${id}`);
  }

  async function deletarAtividadePorId(id:number) {
    return api.delete(`/atividades/${id}`);
  }

  async function atualizarAtividadePorId(id: number, payload: object) {
    return api.put(`/atividades/${id}`, payload);
  }

  async function MinhasAtividades(id:number) {
    return api.get(`/atividades/minhas-atividades/${id}`);
  }

  async function filtroAtividade({
    id,
    queryParams = {},
    page = 0,
    size = 10,
  }: {
    id: number;
    queryParams?: Record<string, any>;
    page?: number;
    size?: number;
  }) {
    const baseParams = { page, size, ...queryParams };
    const queryString =
      "?" +
      Object.entries(baseParams)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
    return api.get(`/atividades/minhas-atividades/${id}${queryString}`);
  }

  return {
    salvarAtividade,
    deletarAtividadePorId,
    atualizarAtividadePorId,
    MinhasAtividades,
    filtroAtividade,
    exibirAtividadePorId
  };
}

export default AtividadeService;
