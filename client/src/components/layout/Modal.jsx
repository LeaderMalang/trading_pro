import { Close } from "@mui/icons-material";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-light-dark-clr p-4 rounded-md w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-auto relative">
        <button onClick={onClose} className="absolute top-2 right-1 text-white">
          <Close />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
