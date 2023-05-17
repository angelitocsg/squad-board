const TopButton = () => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <button
      className="btn bg-dark rounded-circle d-flex justify-content-center align-items-center"
      style={{
        position: "fixed",
        bottom: 135,
        right: 15,
        width: 50,
        height: 50,
        zIndex: 999,
      }}
      title="Ir para topo da página"
      onClick={handleClick}
    >
      <i className="bi bi-arrow-up text-white" style={{ fontSize: "1.3em" }}></i>
    </button>
  );
};

export default TopButton;
