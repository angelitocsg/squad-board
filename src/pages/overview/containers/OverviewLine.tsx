import { IMember, IOverviewTask } from "../../../models/IOverview";

interface IProps {
  members: IMember[];
  task: IOverviewTask;
  onRemoveLineClick: (id: string) => void;
  onTaskValueChange: (id: string, name: string, value: string) => void;
}

const OverviewLine = ({
  members,
  task,
  onRemoveLineClick,
  onTaskValueChange,
}: IProps) => {
  const handleTaskChange = (evt: any) => {
    onTaskValueChange &&
      onTaskValueChange(task.id, evt.target.name, evt.target.value);
  };

  const handleRemoveLine = () => {
    onRemoveLineClick && onRemoveLineClick(task.id);
  };

  return (
    <tr>
      <td style={{ maxWidth: 100 }}>
        <input
          type="number"
          name="order"
          id="order"
          className="form-control form-control-sm"
          value={task.order}
          onChange={handleTaskChange}
        />
      </td>
      <td style={{ maxWidth: 100 }}>
        <select
          className="form-select form-select-sm"
          name="priority"
          value={task.priority}
          onChange={handleTaskChange}
          id="priority"
          aria-label="Default select example"
        >
          <option value="low">baixa</option>
          <option value="medium">média</option>
          <option value="high">alta</option>
        </select>
      </td>
      <td>
        <input
          type="string"
          name="summary"
          id="summary"
          className="form-control form-control-sm"
          value={task.summary}
          onChange={handleTaskChange}
        />
      </td>
      <td>
        <textarea
          name="description"
          id="description"
          rows={1}
          className="form-control form-control-sm"
          value={task.description}
          onChange={handleTaskChange}
        />
      </td>
      <td style={{ maxWidth: 100 }}>
        <select
          className="form-select form-select-sm"
          name="user"
          value={task.user}
          onChange={handleTaskChange}
          id="user"
          aria-label="Default select example"
        >
          <option value="">-- Selecione --</option>
          {members.map((m) => (
            <option key={m.user} value={m.user}>
              {m.name}
            </option>
          ))}
        </select>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-sm btn-danger w-100"
          onClick={handleRemoveLine}
        >
          excluir
        </button>
      </td>
    </tr>
  );
};

export default OverviewLine;
