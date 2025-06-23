import {
    cloneElement,
    createContext,
    useContext,
    useState,
  } from "react";
  import { createPortal } from "react-dom";
  import useOutsideClick from "../../hooks/useOutsideClick";
  
  /**
   * ModalContext to manage modal state within the component tree.
   */
  const ModalContext = createContext(undefined);
  
  /**
   * Modal component that provides context and methods to manage modals.
   *
   * @param {Object} props - The props for the Modal component.
   * @param {React.ReactNode} props.children - The child components wrapped within the Modal context.
   *
   * @returns {JSX.Element} The rendered Modal context provider.
   */
  const Modal = ({ children }) => {
    const [openName, setOpenName] = useState("");
    const close = () => setOpenName("");
    const openModal = (name) => setOpenName(name);
  
    return (
      <ModalContext.Provider value={{ openModal, close, openName }}>
        {children}
      </ModalContext.Provider>
    );
  };
  
  /**
   * Open component that triggers the opening of a modal when clicked.
   *
   * @param {Object} props - The props for the Open component.
   * @param {React.ReactNode} props.children - The content triggering the modal open on click.
   * @param {string} props.opens - The name of the modal to open.
   *
   * @returns {JSX.Element} The rendered Open component with a click handler.
   */
  const Open = ({ children, opens }) => {
    const context = useContext(ModalContext);
  
    if (!context) {
      throw new Error("Open must be used within a Modal");
    }
  
    const { openModal } = context;
  
    return cloneElement(children, {
      onClick: () => openModal(opens),
    });
  };
  
  /**
   * Window component that renders the modal content if the modal's name matches the open modal name.
   *
   * @param {Object} props - The props for the Window component.
   * @param {string} props.name - The name of the modal to match.
   * @param {React.ReactNode | Function} props.children - The content to render inside the modal.
   *
   * @returns {JSX.Element|null} The rendered modal window content, or null if the modal isn't open.
   */
  const Window = ({ children, name }) => {
    const context = useContext(ModalContext);
  
    if (!context) {
      throw new Error("Window must be used within a Modal");
    }
  
    const { openName, close } = context;
    const ref = useOutsideClick(close);
  
    if (name !== openName) return null;
  
    const modalContainer = document.querySelector(".modal");


const CloseButton= ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-gray-400 hover:text-gray-800 text-4xl px-2 py-1 "
    >
      &times;
    </button>
  );
};


  
    return modalContainer
      ? createPortal(
          <div className="fixed inset-0 w-full h-screen bg-opacity-40 bg-gray-600 backdrop-blur-sm z-[1000] transition-all duration-500">
            <div
              ref={ref}
              className="md:px-20 py-14 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg p-8 transition-all duration-500 w-11/12 lg:w-1/2 max-h-[95%] overflow-y-auto"
            >
              <span className="absolute right-12 top-12">
                <CloseButton onClick={close} />
              </span>
              {typeof children === "function"
                ? children({ onClose: close })
                : children}
            </div>
          </div>,
          modalContainer
        )
      : null;
  };
  
  Modal.Open = Open;
  Modal.Window = Window;
  
  export default Modal;
  