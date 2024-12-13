import { useState } from "react";
import FormComponent from "../../components/formulario-atividade";
import Modal from "../../components/modal";

const ListaUsuarios = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
const handleOpenModal = () => {
  setIsOpen(true);
};

const handleCloseModal = () => {
  setIsOpen(false);
};
  return (
    <div>
<Modal onClose={handleCloseModal} isOpen={isOpen} size="small">
          <FormComponent
            onClose={handleCloseModal}
          />

      </Modal>
      <button onClick={handleOpenModal}className="bg-red">
        Adicionar
      </button>
      {/* <ProfileCardComponents/> */}
    </div>
  );
}

export default ListaUsuarios;

