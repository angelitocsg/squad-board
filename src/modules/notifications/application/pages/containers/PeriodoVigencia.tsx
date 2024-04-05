import FormInput from "../../../../../modules/core/components/FormInput";
import { NotificationModel } from "../../data/NotificationModel";

interface IProps {
  notification: NotificationModel;
  updateValue: (field: string, value: any) => void;
}

const PeriodoVigencia = ({ notification, updateValue }: IProps) => {
  return (
    <div className="row">
      <div className="col">
        <FormInput
          type="date"
          label="Data início da vigência"
          field="st"
          value={notification.st}
          onChange={(e) => updateValue(e.target.name, e.target.value)}
        />
      </div>
      <div className="col">
        <FormInput
          type="time"
          label="Hora início da vigência"
          field="sth"
          value={notification.sth}
          onChange={(e) => updateValue(e.target.name, e.target.value)}
        />
      </div>
      <div className="col">
        <FormInput
          type="date"
          label="Data final da vigência"
          field="ed"
          value={notification.ed}
          onChange={(e) => updateValue(e.target.name, e.target.value)}
        />
      </div>
      <div className="col">
        <FormInput
          type="time"
          label="Hora final da vigência"
          field="edh"
          value={notification.edh}
          onChange={(e) => updateValue(e.target.name, e.target.value)}
        />
      </div>
    </div>
  );
};

export default PeriodoVigencia;
