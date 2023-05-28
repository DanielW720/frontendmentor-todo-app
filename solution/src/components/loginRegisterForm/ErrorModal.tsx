import Modal from "react-modal";
import styles from "./ErrorModal.module.css";

export const ErrorModal = ({
  modalIsOpen,
  errorMessage: errorMessageMarkup,
  handleCloseModal,
}: {
  modalIsOpen: boolean;
  errorMessage: JSX.Element;
  handleCloseModal: () => void;
}) => {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={modalIsOpen}
      onRequestClose={handleCloseModal}
      className={styles.Modal}
      overlayClassName={styles.Overlay}
    >
      {errorMessageMarkup}
      <button className="text-brightBlue mt-8" onClick={handleCloseModal}>
        Close
      </button>
    </Modal>
  );
};
