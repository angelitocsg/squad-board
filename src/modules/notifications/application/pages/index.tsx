import FormInput from "../../../../modules/core/components/FormInput";
import SelectInput from "../../../../modules/core/components/SelectInput";
import { vv_cp, vv_fx, vv_mf, vv_t } from "../data/SelectOptions";
import ConteudoAtual from "./containers/ConteudoAtual";
import InOutNotificationJson from "./containers/InOutNotificationJson";
import NotificacoesRegistradas from "./containers/NotificacoesRegistradas";
import PeriodoVigencia from "./containers/PeriodoVigencia";
import Redirecionamento from "./containers/Redirecionamento";
import useController from "./useController";

const NotificationsPage = () => {
  const {
    messages,
    notification,
    valid_data,
    is_modal,
    editNotification,
    saveNotification,
    updateValue,
    updateInputValue,
    updateSelectMultiple,
    removeNotification,
    set_valid_data,
  } = useController();

  return (
    <section className="container mt-4">
      <h1 className="h4 mb-3">Notificações</h1>
      <InOutNotificationJson
        valid_data={valid_data}
        set_valid_data={set_valid_data}
      />
      <ConteudoAtual
        valid_data={valid_data}
        updateInputValue={updateInputValue}
      />
      <NotificacoesRegistradas
        messages={messages}
        editNotification={editNotification}
        removeNotification={removeNotification}
      />
      <h2 className="h5 mt-5 mb-2">Adicionar notificação</h2>
      <hr className="m-0 mb-3" style={{ height: 5, background: "#000000" }} />
      <form onSubmit={saveNotification}>
        <div className="row">
          <div className="col">
            <SelectInput
              label="Componente"
              field="cp"
              options={vv_cp}
              value={notification.cp}
              onChange={(e) => updateValue(e.target.name, e.target.value)}
            />
          </div>
          <div className="col">
            <SelectInput
              label="Tipo"
              field="t"
              options={vv_t[notification.cp]}
              value={notification.t}
              onChange={(e) => updateValue(e.target.name, e.target.value)}
            />
          </div>
          <div className="col">
            <SelectInput
              label="Comportamento"
              field="fx"
              options={vv_fx}
              value={notification.fx}
              onChange={(e) => updateValue(e.target.name, e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <FormInput
              type="text"
              label={`Título (Máximo 50 caracteres. Atual: ${
                notification.tit?.length ?? 0
              })`}
              field="tit"
              maxLength={50}
              value={notification.tit}
              placeholder="Preencha o título da notificação"
              onChange={(e) => updateValue(e.target.name, e.target.value)}
            />
          </div>
        </div>

        {is_modal && (
          <div className="row">
            <div className="col">
              <FormInput
                type="text"
                label={`Texto botão (Máximo 15 caracteres. Atual: ${
                  notification.txb?.length ?? 0
                })`}
                field="txb"
                maxLength={15}
                value={notification.txb}
                placeholder="ex: ok, entendi"
                onChange={(e) => updateValue(e.target.name, e.target.value)}
              />
            </div>
            <div className="col">
              <FormInput
                type="text"
                label={`Texto checkbox [opcional] (Máximo 15 caracteres. Atual: ${
                  notification.chk?.length ?? 0
                })`}
                field="chk"
                maxLength={30}
                value={notification.chk}
                placeholder="ex: estou ciente do comunicado"
                onChange={(e) => updateValue(e.target.name, e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-7">
            <FormInput
              type="textarea"
              label={
                is_modal
                  ? "Mensagem"
                  : `Mensagem (Máximo 200 caracteres. Atual: ${
                      notification.m?.length ?? 0
                    })`
              }
              field="m"
              rows={4}
              maxLength={is_modal ? undefined : 200}
              value={notification.m}
              placeholder="Preencha a mensagem"
              onTextAreaChange={(e) =>
                updateValue(e.target.name, e.target.value)
              }
            />
          </div>
          <div className="col">
            <SelectInput
              label="Microfrontend*"
              multiple
              field="mf"
              options={vv_mf}
              value={notification.mf}
              onChange={(e) =>
                updateSelectMultiple(e.target.name, e.target.options)
              }
            />
          </div>
        </div>

        <PeriodoVigencia
          notification={notification}
          updateValue={updateValue}
        />

        <Redirecionamento
          notification={notification}
          updateValue={updateValue}
        />

        <div className="row">
          <div className="col">
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary mt-3">
                Salvar
              </button>
            </div>
          </div>
        </div>
      </form>
      <br />
    </section>
  );
};

export default NotificationsPage;
