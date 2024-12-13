import React, { useState, useEffect } from "react"; 
import AtividadeService from "../../service/atividadeService";
import { useMutation } from "@tanstack/react-query";

const atividadeService = AtividadeService();

const Atividades = () => {

  const [atividades, setAtividades] = useState([]);
  const [idUsuario, setIdUsuario] = useState(1); 


  const handleGetMinhasAtividades = async (id: number) => {
    try {
      const response = await atividadeService.MinhasAtividades({ id });
      setAtividades(response.data);  
      console.log("Minhas Atividades:", response.data);
    } catch (error) {
      console.error("Erro ao obter minhas atividades:", error);
    }
  };


  useEffect(() => {
    handleGetMinhasAtividades(idUsuario);
  }, [idUsuario]);  


  const handlePut = (id: number, data: object) => {
    mutationPut.mutate({ id, payload: data });
  };


  const handleDelete = (id: number) => {
    mutationDelete.mutate(id);
  };


  const mutationPut = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: object }) =>
      atividadeService.atualizarAtividadePorId(id, payload),
    onSuccess: () => {
      console.log("Atividade atualizada com sucesso!");
    },
    onError: () => {
      console.error("Erro ao atualizar atividade!");
    },
  });


  const mutationDelete = useMutation({
    mutationFn: (id: number) => atividadeService.deletarAtividadePorId({ id }),
    onSuccess: () => {
      console.log("Atividade deletada com sucesso!");
    },
    onError: () => {
      console.error("Erro ao deletar atividade!");
    },
  });

  return (
    <div>

      <div>
        {atividades.length > 0 ? (
          atividades.map((atividade: any) => (
            <div key={atividade.id}>
              <h3>Atividade ID: {atividade.id}</h3>
              <p>Nome da Atividade: {atividade.nome}</p>
              <p>Usuário Convidado ID: {atividade.idUsuarioConvidado}</p>


              <button onClick={() => handlePut(atividade.id, { nome: "Nova Atividade" })}>
                Update Atividade
              </button>
              <button onClick={() => handleDelete(atividade.id)}>Delete Atividade</button>
            </div>
          ))
        ) : (
          <p>Não há atividades para exibir.</p>
        )}
      </div>
    </div>
  );
};

export default Atividades;
