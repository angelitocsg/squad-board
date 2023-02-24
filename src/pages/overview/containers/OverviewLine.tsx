import {
  IMember,
  IOverviewFeatures,
  IOverviewTask,
} from "../../../models/IOverview";

interface IProps {
  features: IOverviewFeatures[];
  members: IMember[];
  task: IOverviewTask;
  onRemoveLineClick: (id: string) => void;
  onTaskValueChange: (id: string, name: string, value: string) => void;
}

const OverviewLine = ({
  features,
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
      <td className="p-0" style={{ maxWidth: 100 }}>
        <select
          className="form-select form-select-sm"
          name="priority"
          value={task.priority}
          onChange={handleTaskChange}
          id="priority"
          aria-label="Default select example"
        >
          <option value="very-low">muito baixa</option>
          <option value="low">baixa</option>
          <option value="medium">média</option>
          <option value="high">alta</option>
          <option value="very-high">muito alta</option>
        </select>
      </td>
      <td className="p-0" style={{ maxWidth: 100 }}>
        <input
          type="string"
          name="summary"
          id="summary"
          className="form-control form-control-sm"
          value={task.summary}
          list="featuresOptions"
          onChange={handleTaskChange}
        />
        <datalist id="featuresOptions">
          {features.map((a) => (
            <option key={a.name} value={a.name} />
          ))}
        </datalist>
      </td>
      <td className="p-0" style={{ maxWidth: 300 }}>
        <input
          type="string"
          name="description"
          id="description"
          className="form-control form-control-sm"
          value={task.description}
          onChange={handleTaskChange}
        />
      </td>
      <td className="p-0" style={{ maxWidth: 100 }}>
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
      <td className="p-0" style={{ maxWidth: 50 }}>
        <button
          type="button"
          className="btn btn-sm btn-danger w-100"
          onClick={handleRemoveLine}
        >
          <i className="bi bi-trash"></i> excluir
        </button>
      </td>
    </tr>
  );
};

export default OverviewLine;
