import FormInput from "../../../../../modules/core/components/FormInput";
import NotificacaoModel from "../../data/NotificacaoModel";

interface IProps {
  notification: NotificacaoModel;
  onChange: (e: any) => void;
}

const PeriodoVigencia = ({ notification, onChange: handleChange }: IProps) => {
  return (
    <div className="row">
      <div className="col">
        <FormInput
          type="date"
          label="Data início da vigência"
          field="st"
          value={notification.st}
          onChange={handleChange}
        />
      </div>
      <div className="col">
        <FormInput
          type="time"
          label="Hora início da vigência"
          field="sth"
          value={notification.sth}
          onChange={handleChange}
        />
      </div>
      <div className="col">
        <FormInput
          type="date"
          label="Data final da vigência"
          field="ed"
          value={notification.ed}
          onChange={handleChange}
        />
      </div>
      <div className="col">
        <FormInput
          type="time"
          label="Hora final da vigência"
          field="edh"
          value={notification.edh}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default PeriodoVigencia;
