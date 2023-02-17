const ImportButton = () => {
  return (
    <button
      className="btn bg-primary rounded-circle d-flex justify-content-center align-items-center"
      style={{
        position: "fixed",
        bottom: 15,
        right: 15,
        width: 50,
        height: 50,
        zIndex: 999,
      }}
      title="Importar conteúdo"
      data-bs-toggle="modal"
      data-bs-target="#importBoard"
    >
      <i className="bi bi-upload text-white" style={{ fontSize: "1.3em" }}></i>
    </button>
  );
};

export default ImportButton;
