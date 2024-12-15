const CardAtividadeComponent = ({
    status,
    titulo,
    descricao,
    criador,
    convidado,
    criadaEm,
    dataEncontro,
    horario,
    local,
    idUsuario,
  }) => {
    const getStatusStyles = () => {
      switch (status) {
        case "Pendente":
          return {
            bgColor: "bg-[#8B7AF038]",
            textColor: "text-[#6248FF]",
          };
        case "Confirmada":
          return {
            bgColor: "bg-[#51E7C452]",
            textColor: "text-[#16AD8A]",
          };
        case "Rejeitada":
          return {
            bgColor: "bg-[#FF000063]",
            textColor: "text-[#E00000]",
          };
        default:
          return {
            bgColor: "bg-gray-200",
            textColor: "text-gray-500",
          };
      }
    };

    const truncateText = (text, maxLength) => {
      return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };

    const { bgColor, textColor } = getStatusStyles();

    const visualizarMensagem = () => {
      console.log(
        "to do"
      );
    };

    const editarMensagem = (event) => {
      event.stopPropagation();
      console.log(
        "to do"
      );
    };

    const rejeitarMensagem = (event) => {
      event.stopPropagation();
      console.log(
         "to do"
      );
    };

    const confirmarMensagem = (event) => {
      event.stopPropagation();
      console.log(
         "to do"
      );
    };

    return (
      <div
        onClick={visualizarMensagem}
        className="w-full sm:w-full md:w-[380px] shadow-md rounded-md p-2 hover:opacity-90 duration-100 cursor-pointer"
      >
        <div className="flex justify-between">
          <div
            className={`flex gap-2 px-4 rounded-full items-center justify-center ${bgColor}`}
          >
            <div
              className={`w-2 h-2 rounded-full ${bgColor} bg-opacity-100`}
            ></div>
            <p className={`font-bold text-xs ${textColor}`}>{status}</p>
          </div>
          <div className="flex gap-3">
            {idUsuario !== criador.idUsuario && (
              <p
                onClick={rejeitarMensagem}
                className="flex gap-2 px-4 bg-red-500 rounded-full items-center justify-center text-white hover:opacity-80 cursor-pointer duration-100 text-sm"
              >
                Rejeitar
              </p>
            )}
            <p
              onClick={(event) => {
                idUsuario === criador.idUsuario
                  ? editarMensagem(event)
                  : confirmarMensagem(event);
              }}
              className="flex gap-2 px-4 bg-emerald-400 rounded-full items-center justify-center text-white hover:opacity-80 cursor-pointer duration-100 text-sm"
            >
              {idUsuario === criador.idUsuario ? "Editar" : "Confirmar"}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p className="font-bold text-[20px]">{truncateText(titulo, 60)}</p>
          <p className="font-normal text-[12px] text-[#656565] mt-2">
            {truncateText(descricao, 100)}
          </p>
        </div>

        <div className="mt-2 flex gap-2 items-center">
          <p className="font-bold text-[#747474] text-[14px]">Participantes:</p>
          <div className="flex">
            <div className="h-5 w-5 mx-auto md:mx-0 rounded-full bg-red-400 overflow-hidden">
              <img
                src={convidado.foto}
                alt="CONVIDADO"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="h-5 w-5 mx-auto md:mx-0 rounded-full bg-red-400 overflow-hidden">
              <img
                src={criador.foto}
                alt="CRIADOR"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="mt-2 mb-2">
          <hr></hr>
        </div>
        <div className="mt-2 flex gap-2 items-center">
          <p className="font-bold text-[#747474] text-[13px]">
            Atividade criada em:
          </p>
          <p className="font-normal items-center text-[12px] text-[#494949]">
            {criadaEm}
          </p>
        </div>
        <div className="flex gap-2 items-center mt-2">
          <p className="font-bold text-[#747474] text-[13px]">
            Data de encontro:
          </p>
          <p className="font-normal text-[12px] text-[#494949]">
            {dataEncontro} às {horario} horas
          </p>
        </div>
        <div className="flex gap-2 items-center mt-2">
          <p className="font-bold text-[#747474] text-[13px]">Local:</p>
          <p className="font-normal text-[12px] text-[#494949]">{local}</p>
        </div>
      </div>
    );
  };

  export default CardAtividadeComponent;
