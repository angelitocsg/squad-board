import { useEffect, useRef, useState } from "react";

import { useService } from "../../../../di/DecouplerContext";
import AlertModalService, { IModal } from "./AlertModalService";
import AppModalService from "../AppModal/AppModalService";

const BACKDROP_ID = "modal-backdrop";

const useModalController = () => {
  const service = useService<AlertModalService>("AlertModalService");
  const modal = useService<AppModalService>("AppModalService");
  const [state, setModalState] = useState<IModal>({ type: "info" });
  const [visible, setVisible] = useState<boolean>(false);
  const [size, setSize] = useState<string>();
  const myModal = useRef<any>();

  useEffect(() => {
    if (!myModal) return;
    const body = document.getElementsByTagName("body")[0];
    if (visible) {
      showModal(body);
      addBackdrop(body);
    } else {
      hideModal(body);
      removeBackdrop(body);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

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

  useEffect(() => {
    const sub = service.visibility$.subscribe((state) => {
      setVisible(state);
    });
    return () => {
      sub.unsubscribe();
    };
  }, [service.visibility$]);

  const handleOk = () => {
    if (state.buttonOkAction) state.buttonOkAction();
  };

  const handleCancel = () => {
    if (state.buttonCancelAction) state.buttonCancelAction();
    service.close();
  };

  const showModal = (body: HTMLBodyElement) => {
    body.classList.add("modal-open");
    body.setAttribute("style", "overflow: hidden");
    myModal.current.classList.add("show");
    myModal.current.style.display = "block";
    myModal.current.setAttribute("aria-modal", "true");
    myModal.current.removeAttribute("aria-hidden");
  };

  const hideModal = (body: HTMLBodyElement) => {
    body.classList.remove("modal-open");
    body.setAttribute("style", "");
    myModal.current.classList.remove("show");
    myModal.current.style.display = "none";
    myModal.current.removeAttribute("aria-modal");
    myModal.current.setAttribute("aria-hidden", "true");
  };

  const addBackdrop = (body: HTMLBodyElement) => {
    if (modal.isOpen) return; // ignorar backdrop se o modal do app estiver aberto
    let backdrop = document.getElementsByClassName(BACKDROP_ID)?.item(0);
    if (backdrop) return;
    backdrop = document.createElement("div");
    backdrop.classList.add("modal-backdrop", "fade", "show");
    body.appendChild(backdrop);
  };

  const removeBackdrop = (body: HTMLBodyElement) => {
    if (modal.isOpen) return; // ignorar backdrop se o modal do app estiver aberto
    const backdrop = document.getElementsByClassName(BACKDROP_ID)?.item(0);
    backdrop && body.removeChild(backdrop);
  };

  return {
    state,
    size,
    myModal,
    handleOk,
    handleCancel,
  };
};

export default useModalController;
