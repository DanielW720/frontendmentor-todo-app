import ReactDOM from "react-dom";

export const Modal = ({
  handleCloseModal,
  children,
}: {
  handleCloseModal: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div>
      {ReactDOM.createPortal(
        <RootModal handleCloseModal={handleCloseModal}>{children}</RootModal>,
        document.getElementById("modal") as HTMLDivElement
      )}
    </div>
  );
};

const RootModal = ({
  handleCloseModal,
  children,
}: {
  handleCloseModal: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div
      id="root-modal-container"
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLDivElement).id === "root-modal-container") {
          handleCloseModal();
        }
      }}
      className={`absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center backdrop-blur-sm`}
    >
      <div className="mx-2 flex h-40 flex-col items-center justify-between rounded-md bg-formLeft p-5">
        {children}
        <button className="text-white" onClick={handleCloseModal}>
          Close
        </button>
      </div>
    </div>
  );
};
