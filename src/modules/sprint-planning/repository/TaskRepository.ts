import { Observable } from "rxjs";
import Task from "../domain/Task";

export type TFilter = {
  description?: string;
};

export default interface TaskRepository {
  data$: Observable<Task[]>;
  clear: () => void;
  getAll: (filter?: TFilter) => Task[];
  getById: (id: string) => Task | undefined;
  create: (entity: Task) => Task;
  delete: (id: string) => void;
}
