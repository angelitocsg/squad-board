interface IProps {
  onClick: () => void;
}

const ExportButton = ({ onClick }: IProps) => {
  const handleOnClick = () => {
    onClick && onClick();
  };

  return (
    <button
      className="btn bg-primary rounded-circle d-flex justify-content-center align-items-center"
      style={{
        position: "fixed",
        bottom: 15,
        right: 75,
        width: 50,
        height: 50,
        zIndex: 999,
      }}
      title="Exportar conteúdo"
      onClick={handleOnClick}
    >
      <i
        className="bi bi-download text-white"
        style={{ fontSize: "1.3em" }}
      ></i>
    </button>
  );
};

export default ExportButton;
