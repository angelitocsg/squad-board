import { BehaviorSubject } from "rxjs";

export type IModal = {
  title?: string;
  size?: "full" | "large";
  modalId?: string;
  buttonOkLabel?: string;
  buttonOkAction?: () => void;
  buttonCancelLabel?: string;
  buttonCancelAction?: () => void;
  buttonCancelHidden?: boolean;
  children?: any;
};

export default class AppModalService {
  private state: BehaviorSubject<IModal> = new BehaviorSubject({});
  private visible: BehaviorSubject<boolean> = new BehaviorSubject(false);
  state$ = this.state.asObservable();

  config(modal: IModal): AppModalService {
    this.state.next(modal);
    return this;
  }

  open() {
    this.visible.next(true);
  }

  close() {
    this.visible.next(false);
  }
}
