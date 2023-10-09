import { useState } from "react";

import FloatingButton, { IPosition } from "./button";

type IFloatingButton = {
  title: string;
  icon: string;
  position?: IPosition;
  onClick: () => void;
};

type IProps = {
  buttons: IFloatingButton[];
};

const FloatingButtonMenu = ({ buttons }: IProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="d-flex justify-content-end align-items-center"
      style={{
        position: "fixed",
        height: 55,
        bottom: 15,
        right: 15,
        zIndex: 999,
      }}
    >
      <FloatingButton
        position={{ size: 55, fontSize: open ? "1.5em" : "1.2em" }}
        title="Menu"
        icon={open ? "bi-dropbox " : "bi-box-fill"}
        color={open ? "warn" : "blue"}
        onClick={() => setOpen(!open)}
      />
      {open &&
        buttons.map((button, i) => (
          <FloatingButton
            key={i}
            position={{ right: 55 * i + 75, size: 50, ...button.position }}
            title={button.title}
            icon={button.icon}
            color="blue"
            onClick={button.onClick}
          />
        ))}
    </div>
  );
};

export default FloatingButtonMenu;
