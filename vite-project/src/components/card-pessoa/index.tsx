
const CardPessoaComponent = ({
  name,
  dataNacimento,
  cidade,
  estado,
  necessidades,
  profile,
  abrirModalAgendamento,
  abrirModalUsuario,
  sexo = "feminino",
  idoso = true,
  podeAgendar,
}) => {
  const obterCorDeFundo = () => {
    if (!sexo || idoso === null) return "bg-[#BCBCBC]";
    if (idoso) {
      if (sexo === "masculino") return "bg-[#3463FF]";
      if (sexo === "feminino") return "bg-[#9381FF]";
    }
    return "bg-[#00ff73]";
  };

  return (
    <div className="w-full max-w-[487px] rounded-md shadow-md mx-auto bg-white overflow-hidden">
      <div className={`w-full rounded-t-md h-10 ${obterCorDeFundo()}`}>
        <div className="flex  justify-end  items-center px-4 gap-3">
          {podeAgendar && (
            <button
              onClick={abrirModalAgendamento}
              className="flex items-center justify-center  py-2  text-white text-sm rounded-full hover:opacity-75"
              title="Agendamento"
            >
              <span className="material-symbols-outlined text-xl">
                calendar_month
              </span>
            </button>
          )}

          <button
            onClick={abrirModalUsuario}
            className="flex items-center justify-center  py-2  text-white text-sm rounded-full hover:opacity-75"
            title="Visualizar perfil"
          >
            <span className="material-symbols-outlined text-xl">
              account_circle
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center p-3 gap-4">
        <div className="h-24 w-24 rounded-full overflow-hidden border-2 ">
          <img
            src={profile || "/public/sem_avatar.png"}
            alt="Avatar"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <p className="font-bold text-sm">Nome</p>
              <p className="text-xs">{name || "Não informado"}</p>

              <p className="font-bold text-sm mt-2">Nascimento</p>
              <p className="text-xs">{dataNacimento || "Não informado"}</p>
            </div>

            <div>
              <p className="font-bold text-sm">Cidade</p>
              <p className="text-xs">
                {cidade && estado ? `${cidade} / ${estado}` : "Não informado"}
              </p>

              <p className="font-bold text-sm mt-2">Necessidades</p>
              <p className="text-xs">
                {necessidades || "Nenhuma necessidade específica"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPessoaComponent;
