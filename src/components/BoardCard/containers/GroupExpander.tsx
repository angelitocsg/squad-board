import { TPriority } from "../../../interfaces/BoardIssues";
import TaskPriority from "../../TaskPriority";

interface IProps {
  id?: string;
  group?: boolean;
  expanded: boolean;
  priority?: TPriority;
}

const BoardCardGroupExpander = ({ id, group, expanded, priority }: IProps) => (
  <div>
    {group && !expanded && (
      <>
        <TaskPriority id={id} priority={priority} xclass="pt-2 pe-2" />
        <i className="bi bi-caret-right-fill text-secondary"></i>
      </>
    )}
    {group && expanded && (
      <i className="bi bi-caret-down-fill text-secondary"></i>
    )}
  </div>
);

export default BoardCardGroupExpander;
