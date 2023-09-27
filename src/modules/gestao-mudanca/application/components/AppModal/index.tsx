import { useEffect, useState } from "react";
import { useService } from "../../../../../di/DecouplerContext";
import AppModalService, { IModal } from "./AppModalService";

const AppModal = () => {
  const service = useService<AppModalService>("AppModalService");
  const [state, setModalState] = useState<IModal>({});
  const [size, setSize] = useState<string>();
  const _modalId = `${state.modalId ?? "appModal"}`;
  const _modalIdLabel = `${state.modalId ?? "appModal"}`;
  const _modalDialogStyle = `modal-dialog modal-dialog-centered ${size}`;

  useEffect(() => {
    setSize(
      state.size === "full"
        ? "modal-fullscreen"
        : state.size === "large"
        ? "modal-lg"
        : state.size
    );
  }, [state.size]);

  useEffect(() => {
    const sub = service.state$.subscribe((state) => {
      setModalState(state);
    });
    return () => {
      sub.unsubscribe();
    };
  }, [service.state$]);

  const handleOk = () => {
    if (state.buttonOkAction) state.buttonOkAction();
  };

  const handleCancel = () => {
    if (state.buttonCancelAction) state.buttonCancelAction();
  };

  const Header = () => (
    <div className="modal-header">
      <h1 className="modal-title fs-5" id={_modalIdLabel}>
        {state.title}
      </h1>
    </div>
  );

  const Body = () => (
    <div className="modal-body">
      {state.children ? state.children() : undefined}
    </div>
  );

  const Footer = () => (
    <div className="modal-footer">
      {state.buttonCancelHidden ? undefined : (
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
          onClick={handleCancel}
        >
          {state.buttonCancelLabel ?? "Cancelar"}
        </button>
      )}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-dismiss="modal"
        onClick={handleOk}
      >
        {state.buttonOkLabel ?? "Ok"}
      </button>
    </div>
  );

  return (
    <div
      className="modal fade"
      id={_modalId}
      tabIndex={-1}
      aria-labelledby={_modalIdLabel}
      aria-hidden="true"
    >
      <div className={_modalDialogStyle}>
        <div className="modal-content">
          <Header />
          <Body />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AppModal;
