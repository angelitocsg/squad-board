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
  impediment: boolean;
  impediment_description?: string;
}

const BoardCardDetails = ({
  id,
  group,
  description,
  expanded,
  assignee,
  priority,
  parent_id,
  impediment,
  impediment_description,
}: IProps) => (
  <div className="flex-grow-1">
    {!!impediment ? (
      <button
        type="button"
        className={`bg-white border-0 p-0 m-0 bi text-danger ${
          !!impediment_description ? "bi-file-earmark-text-fill" : "bi-file-earmark-text"
        } pe-1`}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        data-bs-title={impediment_description}
      />
    ) : undefined}
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
