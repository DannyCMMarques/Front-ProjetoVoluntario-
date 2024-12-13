import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { ModalProps } from "./../../utils/interfaces/ModalProps";
const Modal = ({ isOpen, children, onClose, size }: ModalProps) => {
  const [modalOpen, setModalOpen] = useState(isOpen);

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  const handleCloseModal = () => {
    setModalOpen(false);
    if (onClose) {
      onClose();
    }
  };

  let contentClass;
  switch (size) {
    case "small":
      contentClass =
        "bg-white  rounded-lg shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[600px] max-h-[42rem] overflow-auto p-4 ";
      break;
    case "medium":
      contentClass =
        "bg-white bg-white  rounded-lg shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[900px] p-6 rounded-md";
      break;
    case "large":
      contentClass =
        "bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[70%] p-6 rounded-md";
      break;
    default:
      contentClass =
        "bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[70%] p-6 rounded-md";
  }

  return (
    <div
      className={`fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 z-[9999999999] ${
        modalOpen ? "block" : "hidden"
      }`}
    >
      <div className={`${contentClass}`}>
        {children}

          <button onClick={handleCloseModal} className="absolute top-2 right-2">
            <IoClose size={24} />
          </button>

      </div>
    </div>
  );
};

export default Modal;