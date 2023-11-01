import { BehaviorSubject } from "rxjs";

export type modalType = "error" | "info" | "success";
export type modalSize = "full" | "large";

export type IModal = {
  title?: string;
  size?: modalSize;
  type: modalType;
  modalId?: string;
  buttonOkLabel?: string;
  buttonOkAction?: () => void;
  buttonCancelLabel?: string;
  buttonCancelAction?: () => void;
  buttonCancelHidden?: boolean;
  children?: any;
};

export default class AlertModalService {
  private initial: IModal = {
    type: "info",
    buttonOkAction: this.close.bind(this),
    buttonCancelAction: this.close.bind(this),
  };
  private state: BehaviorSubject<IModal> = new BehaviorSubject(this.initial);
  private visible: BehaviorSubject<boolean> = new BehaviorSubject(false);
  state$ = this.state.asObservable();
  visibility$ = this.visible.asObservable();

  config(modal: IModal): AlertModalService {
    this.state.next({ ...this.initial, ...modal });
    return this;
  }

  open() {
    this.visible.next(true);
  }

  close() {
    this.state.next(this.initial);
    this.visible.next(false);
  }
}
