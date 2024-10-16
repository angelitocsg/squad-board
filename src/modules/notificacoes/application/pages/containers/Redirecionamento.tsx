import FormInput from "../../../../../modules/core/components/FormInput";
import NotificacaoModel from "../../data/NotificacaoModel";

interface IProps {
  notification: NotificacaoModel;
  onChange: (e: any) => void;
}

export const Redirecionamento = ({
  notification,
  onChange: handleChange,
}: IProps) => {
  return (
    <div className="row">
      <div className="col">
        <FormInput
          type="text"
          label="Rota dentro do MFE"
          field="pg"
          maxLength={50}
          value={notification.pg}
          onChange={handleChange}
        />
      </div>
      <div className="col">
        <FormInput
          type="text"
          label="Operação dentro do MFE"
          field="op"
          maxLength={50}
          value={notification.op}
          onChange={handleChange}
        />
      </div>{" "}
      <div className="col">
        <FormInput
          type="text"
          label="Redirecionar para link/ação ao clicar"
          field="lk"
          maxLength={100}
          value={notification.lk}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Redirecionamento;
