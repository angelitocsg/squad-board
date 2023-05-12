interface IProps {
  clear?: () => void;
}

const ClearCacheButton = ({ clear }: IProps) => {
  const handleClick = () => {
    if (clear) {
      clear();
      setTimeout(() => {
        window.location.reload();
      }, 100);
      return;
    }
    console.error("Clear function is undefined!", clear);
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
        zIndex: 999,
      }}
      title="Limpar cache"
      onClick={handleClick}
    >
      <i className="bi bi-radioactive" style={{ fontSize: "1.3em" }}></i>
    </button>
  );
};

export default ClearCacheButton;
