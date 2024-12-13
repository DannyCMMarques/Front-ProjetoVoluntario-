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

  async function exibirAtividadePorId({ id }: AtividadeId) {
    return api.get(`/atividades/${id}`);
  }

  async function deletarAtividadePorId({ id }: AtividadeId) {
    return api.delete(`/atividades/${id}`);
  }

  async function atualizarAtividadePorId(id: number, payload: object) {
    return api.put(`/atividades/${id}`, payload);
  }

  async function MinhasAtividades({ id }: AtividadeFiltro) {
    return api.get(`/atividades/minhas-atividades/${id}`);
  }

  async function exibirAtividadesPendentes({ id }: AtividadeFiltro) {
    return api.get(`/atividades/pendentes/${id}`);
  }

  async function exibirAtividadesRejeitadas({ id }: AtividadeFiltro) {
    return api.get(`/atividades/rejeitadas/${id}`);
  }

  async function exibirAtividadesConfirmadas({ id }: AtividadeFiltro) {
    return api.get(`/atividades/confirmadas/${id}`);
  }

  async function exibirAtividadesFinalizadas({ id }: AtividadeFiltro) {
    return api.get(`/atividades/finalizadas/${id}`);
  }

  return {
    salvarAtividade,
    exibirAtividadePorId,
    deletarAtividadePorId,
    atualizarAtividadePorId,
    MinhasAtividades,
    exibirAtividadesPendentes,
    exibirAtividadesRejeitadas,
    exibirAtividadesConfirmadas,
    exibirAtividadesFinalizadas,
  };
}

export default AtividadeService;
