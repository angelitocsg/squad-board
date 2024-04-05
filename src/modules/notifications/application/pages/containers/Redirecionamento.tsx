import FormInput from "../../../../../modules/core/components/FormInput";
import { NotificationModel } from "../../data/NotificationModel";

interface IProps {
  notification: NotificationModel;
  updateValue: (field: string, value: any) => void;
}

export const Redirecionamento = ({ notification, updateValue }: IProps) => {
  return (
    <div className="row">
      <div className="col">
        <FormInput
          type="text"
          label="Redirecionar para link/ação ao clicar"
          field="lk"
          maxLength={100}
          value={notification.lk}
          onChange={(e) => updateValue(e.target.name, e.target.value)}
        />
      </div>{" "}
      <div className="col">
        <FormInput
          type="text"
          label="Rota dentro do MFE"
          field="pg"
          maxLength={50}
          value={notification.pg}
          onChange={(e) => updateValue(e.target.name, e.target.value)}
        />
      </div>
      <div className="col">
        <FormInput
          type="text"
          label="Operação dentro do MFE"
          field="op"
          maxLength={50}
          value={notification.op}
          onChange={(e) => updateValue(e.target.name, e.target.value)}
        />
      </div>
    </div>
  );
};

export default Redirecionamento;
