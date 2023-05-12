import { TPriority } from "../../../types/TPriority";
import TaskPriority from "../../TaskPriority";

interface IProps {
  id?: string;
  group?: boolean;
  expanded: boolean;
  description?: string;
  assignee?: string;
  priority?: TPriority;
  parent_id?: string;
}

const BoardCardDetails = ({
  id,
  group,
  description,
  expanded,
  assignee,
  priority,
  parent_id,
}: IProps) => (
  <div className="flex-grow-1">
    <strong>{description}</strong>
    {((group && expanded) || !group) && id && (
      <>
        <br />
        <small className="card-subtitle text-muted">{assignee}</small>
        <br />
        <TaskPriority id={id} priority={priority} xclass="pt-2" />
        {parent_id && <TaskPriority id={parent_id} xclass="pt-2" />}
      </>
    )}
  </div>
);

export default BoardCardDetails;
