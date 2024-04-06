import useModalController from "./useModalController";

type THeader = { title?: string; modalIdLabel: string };
const Header = ({ title, modalIdLabel }: THeader) => (
  <div className="modal-header bg-light">
    <h1 className="modal-title fs-5" id={modalIdLabel}>
      {title}
    </h1>
  </div>
);

type TBody = { children: any };
const Body = ({ children }: TBody) => (
  <div className="modal-body">{children ? children() : undefined}</div>
);

type TFooter = {
  buttonOkLabel?: string;
  handleOk?: () => void;
  buttonCancelLabel?: string;
  handleCancel?: () => void;
  buttonCancelHidden?: boolean;
};
const Footer = ({
  buttonOkLabel,
  handleOk,
  buttonCancelLabel,
  handleCancel,
  buttonCancelHidden,
}: TFooter) => (
  <div className="modal-footer bg-light">
    {buttonCancelHidden ? undefined : (
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-dismiss="modal"
        onClick={handleCancel}>
        {buttonCancelLabel}
      </button>
    )}
    <button type="button" className="btn btn-primary" onClick={handleOk}>
      {buttonOkLabel}
    </button>
  </div>
);

const AppModal = () => {
  const { state, size, myModal, handleOk, handleCancel } = useModalController();
  const _modalId = `${state.modalId}`;
  const _modalIdLabel = `${state.modalId}`;
  const _modalDialogStyle = `modal-dialog modal-dialog-centered ${size}`;

  return (
    <div
      ref={myModal}
      className="modal fade"
      id={_modalId}
      tabIndex={-1}
      aria-labelledby={_modalIdLabel}
      aria-hidden="true">
      <div className={_modalDialogStyle}>
        <div className="modal-content">
          <Header title={state.title} modalIdLabel={_modalIdLabel} />
          <Body children={state.children} />
          <Footer
            buttonOkLabel={state.buttonOkLabel}
            handleOk={handleOk}
            buttonCancelLabel={state.buttonCancelLabel}
            handleCancel={handleCancel}
            buttonCancelHidden={state.buttonCancelHidden}
          />
        </div>
      </div>
    </div>
  );
};

export default AppModal;
