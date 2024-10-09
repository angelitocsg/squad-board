import { useEffect, useState } from "react";

import FormInput from "../../../core/components/FormInput";
import SelectInput, {
  ISelectOptions,
} from "../../../core/components/SelectInput";
import NotificacaoModel from "../data/NotificacaoModel";
import { vv_cp, vv_fx, vv_mf, vv_t } from "../data/SelectOptions";
import PeriodoVigencia from "./containers/PeriodoVigencia";
import Redirecionamento from "./containers/Redirecionamento";
import { useService } from "../../../../di/DecouplerContext";
import ListaMfeRepository from "../../repository/ListaMfeRepository";

type IProps = {
  data: NotificacaoModel;
  onChange: (data: NotificacaoModel) => void;
};

const NotificacaoForm = ({ data, onChange }: IProps) => {
  const [state, setState] = useState<NotificacaoModel>(data);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [listaMfes, setListaMfes] = useState<ISelectOptions[]>([]);
  const listaMfeRepository =
    useService<ListaMfeRepository>("ListaMfeRepository");

  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectMultiple = (field: string, options: any) => {
    const items = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        items.push(options[i].value);
      }
    }
    handleChange({ target: { name: field, value: items } });
  };

  useEffect(() => {
    setListaMfes(
      (listaMfeRepository.getAll() ?? vv_mf).map((x) => ({
        label: `${x.label} (${x.value})`,
        value: x.value,
      })),
    );
  }, [listaMfeRepository]);

  useEffect(() => {
    onChange && onChange(state);
  }, [onChange, state]);

  useEffect(() => {
    const is = state.cp === "modal";
    if (!is) {
      setState({
        ...state,
        txb: "",
        chk: "",
      });
    }
    setIsModal(is);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.cp]);

  return (
    <div>
      <div className="row">
        <div className="col">
          <SelectInput
            label="Componente"
            field="cp"
            value={state.cp}
            options={vv_cp}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <SelectInput
            label="Tipo"
            field="t"
            options={vv_t[state.cp]}
            value={state.t}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <SelectInput
            label="Comportamento"
            field="fx"
            options={vv_fx}
            value={state.fx}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <FormInput
            type="text"
            label={`Título (Máximo 50 caracteres. Atual: ${
              state.tit?.length ?? 0
            })`}
            field="tit"
            maxLength={50}
            value={state.tit}
            placeholder="Preencha o título da notificação"
            onChange={handleChange}
          />
        </div>
      </div>

      {isModal && (
        <div className="row">
          <div className="col">
            <FormInput
              type="text"
              label={`Texto botão (Máximo 30 caracteres. Atual: ${
                state.txb?.length ?? 0
              })`}
              field="txb"
              maxLength={30}
              value={state.txb}
              placeholder="ex: ok, entendi"
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <FormInput
              type="text"
              label={`Texto checkbox [opcional] (Máximo 50 caracteres. Atual: ${
                state.chk?.length ?? 0
              })`}
              field="chk"
              maxLength={50}
              value={state.chk}
              placeholder="ex: estou ciente do comunicado"
              onChange={handleChange}
            />
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-7">
          <FormInput
            type="textarea"
            label={
              isModal
                ? "Mensagem"
                : `Mensagem (Máximo 200 caracteres. Atual: ${
                    state.m?.length ?? 0
                  })`
            }
            field="m"
            rows={4}
            maxLength={isModal ? undefined : 200}
            value={state.m}
            placeholder="Preencha a mensagem"
            onTextAreaChange={handleChange}
          />
        </div>
        <div className="col">
          <SelectInput
            label="Microfrontend*"
            multiple
            field="mf"
            options={listaMfes}
            value={state.mf}
            onChange={(e) => {
              handleSelectMultiple(e.target.name, e.target.options);
            }}
          />
        </div>
      </div>

      <PeriodoVigencia notification={state} onChange={handleChange} />
      <Redirecionamento notification={state} onChange={handleChange} />
    </div>
  );
};

export default NotificacaoForm;
