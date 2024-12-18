const AtividadeExibida = (atividade) => {
  const atividades = atividade.atividade;

  const handleNavigate = (idUsuario) => {
    window.location.href = `usuario?id=${idUsuario}`;
  };
  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <p className="font-bold text-2xl text-blue-800">
            Detalhes da Atividade
          </p>
        </div>

        <hr className="mt-2 mb-2" />

        <div className="mt-4">
          <div className="border rounded-md p-3 flex flex-wrap gap-5">
            <div>
              <p className="text-blue-500 text-sm">Nome da Atividade</p>
              <p className="text-sm">{atividades?.nomeAtividade}</p>
            </div>
            <div>
              <p className="text-blue-500 text-sm">Descrição</p>
              <p className="text-sm">{atividades?.descricaoAtividade}</p>
            </div>
            <div>
              <p className="text-blue-500 text-sm">Data do Encontro</p>
              <p className="text-sm">{atividades?.dataEncontro}</p>
            </div>
            <div>
              <p className="text-blue-500 text-sm">Horário</p>
              <p className="text-sm">{atividades?.horario}</p>
            </div>
            <div>
              <p className="text-blue-500 text-sm">Tipo do Encontro</p>
              <p className="text-sm">{atividades?.tipoEncontro}</p>
            </div>
            <div>
              <p className="text-blue-500 text-sm">Endereço</p>
              <p className="text-sm">{atividades?.endereco}</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-blue-800">Criado Por</p>
          <div className="border rounded-md p-3 flex gap-5">
            <div>
              <p className="text-blue-500 text-sm">Nome</p>
              <p className="text-sm">{atividades?.usuarioCriador?.nome}</p>
            </div>
            <div>
              <p className="text-blue-500 text-sm">Cidade</p>
              <p className="text-sm">{atividades?.usuarioCriador?.cidade}</p>
            </div>
            <div>
              <p className="text-blue-500 text-sm">Estado</p>
              <p className="text-sm">{atividades?.usuarioCriador?.estado}</p>
            </div>
            <div>
              <span
                className="text-blue-700 hover:text-blue-900 cursor-pointer font-medium text-sm  flex justify-end items-center"
                onClick={() =>
                  handleNavigate(atividades?.usuarioCriador?.idUsuario)
                }
              >
                ➤ Visualizar Perfil
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm  text-blue-800">Convidado</p>
          <div className="border rounded-md p-3 flex gap-5">
            <div>
              <p className="text-blue-500 text-sm">Nome</p>
              <p className="text-sm">{atividades?.usuarioConvidado?.nome}</p>
            </div>
            <div>
              <p className="text-blue-500 text-sm">Cidade</p>
              <p className="text-sm">{atividades?.usuarioConvidado?.cidade}</p>
            </div>
            <div>
              <p className="text-blue-500 text-sm">Estado</p>
              <p className="text-sm">{atividades?.usuarioConvidado?.estado}</p>
            </div>
            <div>
              <span
                className="text-blue-700 hover:text-blue-900 cursor-pointer font-medium text-sm  flex justify-end items-center"
                onClick={() =>
                  handleNavigate(atividades?.usuarioConvidado?.idUsuario)
                }
              >
                ➤ Visualizar Perfil
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AtividadeExibida;
