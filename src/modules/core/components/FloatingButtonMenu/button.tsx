export type IPosition = {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  size?: number;
  fontSize?: string;
};

type IProps = {
  color?: "blue" | "warn" | "light";
  title: string;
  icon: string;
  position: IPosition;
  onClick: () => void;
};

const FloatingButton = ({ color, title, icon, position, onClick }: IProps) => {
  const flexCenterClass = "d-flex justify-content-center align-items-center";
  const defaultClass = `btn rounded-circle ${flexCenterClass}`;
  const iconClass = `bi ${icon}`;
  const getColor = () =>
    color === "blue"
      ? "bg-primary text-white"
      : color === "warn"
      ? "bg-warning text-dark"
      : color === "light"
      ? "bg-dark text-dark"
      : "bg-secondary";
  let buttonClass = `${defaultClass} ${getColor()}`;

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <button
      className={buttonClass}
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        bottom: position.bottom,
        right: position.right,
        width: position.size ?? 50,
        height: position.size ?? 50,
        zIndex: 999,
      }}
      title={title}
      onClick={handleClick}
    >
      <i
        className={iconClass}
        style={{ fontSize: position.fontSize ?? "1em" }}
      ></i>
    </button>
  );
};

export default FloatingButton;
