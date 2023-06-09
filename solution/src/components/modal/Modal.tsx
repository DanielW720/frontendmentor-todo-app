import { useEffect } from "react";
import ReactDOM from "react-dom";

export const Modal = ({
  handleCloseModal,
  children,
}: {
  handleCloseModal: () => void;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === "Escape") {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleCloseModal]);

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
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === "root-modal-container") {
      handleCloseModal();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === "Escape") {
      handleCloseModal();
    }
  };

  return (
    <div
      id="root-modal-container"
      onClick={handleContainerClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      className={`absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center backdrop-blur-sm`}
    >
      <div className="mx-2 flex min-h-[160px] flex-col items-center justify-between rounded-md bg-formLeft p-5">
        {children}
        <button className="text-white" onClick={handleCloseModal}>
          Close
        </button>
      </div>
    </div>
  );
};
