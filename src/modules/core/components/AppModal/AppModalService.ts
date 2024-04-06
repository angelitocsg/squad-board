import { BehaviorSubject } from "rxjs";

export type IModal = {
  title?: string;
  size?: "full" | "large" | "xlarge";
  modalId?: string;
  buttonOkLabel?: string;
  buttonOkAction?: () => void;
  buttonCancelLabel?: string;
  buttonCancelAction?: () => void;
  buttonCancelHidden?: boolean;
  children?: any;
};

export default class AppModalService {
  private initial: IModal = {
    modalId: "appModal",
    buttonOkLabel: "Ok",
    buttonCancelLabel: "Cancelar",
    buttonOkAction: this.close.bind(this),
    buttonCancelAction: this.close.bind(this),
  };
  private state: BehaviorSubject<IModal> = new BehaviorSubject(this.initial);
  private visible: BehaviorSubject<boolean> = new BehaviorSubject(false);
  state$ = this.state.asObservable();
  visibility$ = this.visible.asObservable();

  get isOpen() {
    return this.visible.value;
  }

  config(modal: IModal): AppModalService {
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
