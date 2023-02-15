const ClearCacheButton = () => {
  const clear = () => {
    localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <button
      className="btn text-bg-secondary rounded-circle d-flex justify-content-center align-items-center"
      style={{
        position: "fixed",
        bottom: 75,
        right: 15,
        width: 50,
        height: 50,
      }}
      title="Limpar cache"
      onClick={clear}
    >
      <i className="bi bi-radioactive" style={{ fontSize: "1.3em" }}></i>
    </button>
  );
};

export default ClearCacheButton;
