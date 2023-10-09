import { useEffect, useState } from "react";
import FormInput from "../../../core/components/FormInput";
import TaskModel from "../data/TaskModel";

type IProps = {
  data: TaskModel;
  onChange: (data: TaskModel) => void;
};

const TaskForm = ({ data, onChange }: IProps) => {
  const [state, setState] = useState<TaskModel>(data);

  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    onChange && onChange(state);
  }, [onChange, state]);

  return (
    <div>
      <div className="row">
        <div className="col">
          <FormInput
            type="text"
            label="Título"
            field="title"
            value={state.title}
            onChange={handleChange}
          />
        </div>
      </div>
      <FormInput
        type="textarea"
        label="Descrição"
        field="description"
        value={state.description}
        rows={4}
        onTextAreaChange={handleChange}
      />
      <div className="row">
        <div className="col">
          <FormInput
            type="text"
            label="Responsável"
            field="owner"
            value={state.owner}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <FormInput
            type="text"
            label="Nº item pai"
            field="parentId"
            value={state.parentId}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            type="text"
            label="Nº do item"
            field="externalId"
            value={state.externalId}
            onChange={handleChange}
          />
        </div>{" "}
        <div className="col">
          <FormInput
            type="text"
            label="Sprint"
            field="sprint"
            value={state.sprint}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
