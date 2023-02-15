import useNotifications from "./useNotifications";

const NotificationsPage = () => {
  const {
    messages,
    notification,
    valid_data,
    input_data,
    editNotification,
    saveNotification,
    set_input_data,
    updateValue,
    updateInputValue,
    updateSelectMultiple,
    removeNotification,
  } = useNotifications();

  return (
    <section className="container mt-4">
      <h1 className="h4 mb-3">Notificações</h1>
      <div className="row">
        <div className="col">
          <div className="mb-3">
            <label htmlFor="origem" className="form-label">
              Cole o conteúdo do input-data atual aqui:
            </label>
            <textarea
              style={{ fontFamily: "courier", fontSize: 12 }}
              className="form-control"
              id="origem"
              rows={8}
              value={input_data}
              onChange={(e) => set_input_data(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="col">
          <div className="mb-3">
            <label htmlFor="origem" className="form-label">
              Conteúdo input-data atualizado:
            </label>
            <textarea
              style={{ fontFamily: "courier", fontSize: 12 }}
              readOnly
              className="form-control"
              id="destino"
              rows={8}
              value={JSON.stringify(valid_data)}
            ></textarea>
          </div>
        </div>
      </div>
      {Object.keys(valid_data).filter((f) => f !== "messages").length > 0 && (
        <>
          <h2 className="h5 mt-4 mb-3">Conteúdo atual</h2>
          <table className="table table-hover table-sm">
            <thead className="table-dark">
              <tr>
                <th>Chave</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody className="table-light">
              {Object.keys(valid_data)
                .filter((f) => f !== "messages")
                .map((k) => (
                  <tr key={k}>
                    <td>{k}</td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id={k}
                        name={k}
                        value={
                          typeof valid_data[k] === "string"
                            ? valid_data[k]
                            : JSON.stringify(valid_data[k])
                        }
                        onChange={(e) =>
                          updateInputValue(e.target.name, e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
      <h2 className="h5 mt-5 mb-3">Notificações registradas</h2>
      <table className="table table-hover table-sm">
        <thead className="table-dark">
          <tr>
            <th>Tipo</th>
            <th>Mensagem</th>
            <th colSpan={2}>Vigência</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody className="table-light">
          {(messages as any[]).map((msg, idx) => (
            <tr key={idx}>
              <td>
                {msg.t === "info"
                  ? "Novidade"
                  : msg.t === "warn"
                  ? "Alerta"
                  : msg.t === "error"
                  ? "Erro"
                  : msg.t === "danger"
                  ? "Erro crítico"
                  : "-"}
              </td>
              <td>{msg.m}</td>
              <td>{`${msg.st ?? "0000-00-00"} ${msg.sth ?? "00:00"}`}</td>
              <td>{`${msg.ed ?? "0000-00-00"} ${msg.edh ?? "00:00"}`}</td>
              <td>
                <span
                  role="button"
                  onClick={(e) => editNotification(idx)}
                  className="me-2"
                >
                  <i className="bi bi-pencil"></i>
                </span>
                <span role="button" onClick={(e) => removeNotification(idx)}>
                  <i className="bi bi-trash"></i>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="h5 mt-5 mb-3">Adicionar notificação</h2>
      <form onSubmit={saveNotification}>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="v" className="form-label">
                Versão
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                id="v"
                name="v"
                maxLength={2}
                value={notification.v}
                onChange={(e) => updateValue(e.target.name, e.target.value)}
              />
            </div>
          </div>

          <div className="col">
            <div className="mb-3">
              <label htmlFor="t" className="form-label">
                Tipo
              </label>
              <select
                className="form-select"
                id="t"
                name="t"
                value={notification.t}
                onChange={(e) => updateValue(e.target.name, e.target.value)}
              >
                <option value="info">Novidade</option>
                <option value="warn">Alerta</option>
                <option value="error">Erro</option>
                <option value="danger">Erro crítico</option>
              </select>
            </div>
          </div>

          <div className="col">
            <div className="mb-3">
              <label htmlFor="fx" className="form-label">
                Comportamento
              </label>
              <select
                className="form-select"
                id="fx"
                name="fx"
                value={notification.fx}
                onChange={(e) => updateValue(e.target.name, e.target.value)}
              >
                <option value="0">Usuário pode fechar</option>
                <option value="1">
                  Sempre exibir sem possibilidade de fechar
                </option>
              </select>
            </div>
          </div>

          <div className="col">
            <div className="mb-3">
              <label htmlFor="rcm" className="form-label">
                Reexibir a cada x minutos
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                id="rcm"
                name="rcm"
                maxLength={100}
                value={notification.rcm}
                onChange={(e) => updateValue(e.target.name, e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="m" className="form-label">
                Mensagem{" "}
                <small>
                  (Máximo 200 caracteres. Atual: {notification.m?.length ?? 0})
                </small>
              </label>
              <textarea
                required
                className="form-control"
                id="m"
                name="m"
                rows={4}
                maxLength={200}
                value={notification.m}
                onChange={(e) => updateValue(e.target.name, e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="col">
            <div className="mb-3">
              <label htmlFor="mf" className="form-label">
                Microfrontend
              </label>
              <select
                className="form-select"
                multiple
                id="mf"
                name="mf"
                value={notification.mf}
                onChange={(e) =>
                  updateSelectMultiple(e.target.name, e.target.options)
                }
              >
                <option value="mf-corban-configuracoes">Configurações</option>
                <option value="mf-corban-relatorios">Relatórios</option>
                <option value="mf-corban-gestao-propostas">
                  Gestão propostas
                </option>
                <option value="mf-faq-ui">FAQ</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="pg" className="form-label">
                Rota dentro do MFE
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                id="pg"
                name="pg"
                maxLength={50}
                value={notification.pg}
                onChange={(e) => updateValue(e.target.name, e.target.value)}
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="op" className="form-label">
                Operação dentro do MFE
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                id="op"
                name="op"
                maxLength={50}
                value={notification.op}
                onChange={(e) => updateValue(e.target.name, e.target.value)}
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="lk" className="form-label">
                Redirecionar para link/ação ao clicar
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                id="lk"
                name="lk"
                maxLength={100}
                value={notification.lk}
                onChange={(e) => updateValue(e.target.name, e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="st" className="form-label">
                Data início da vigência
              </label>
              <input
                disabled
                type="date"
                className="form-control"
                id="st"
                name="st"
                value={notification.st}
                onChange={(e) => updateValue(e.target.name, e.target.value)}
              />
            </div>
          </div>

          <div className="col">
            <div className="mb-3">
              <label htmlFor="sth" className="form-label">
                Hora início da vigência
              </label>
              <input
                disabled
                type="time"
                className="form-control"
                id="sth"
                name="sth"
                value={notification.sth}
                onChange={(e) => updateValue(e.target.name, e.target.value)}
              />
            </div>
          </div>

          <div className="col">
            <div className="mb-3">
              <label htmlFor="ed" className="form-label">
                Data final da vigência
              </label>
              <input
                disabled
                type="date"
                className="form-control"
                id="ed"
                name="ed"
                value={notification.ed}
                onChange={(e) => updateValue(e.target.name, e.target.value)}
              />
            </div>
          </div>

          <div className="col">
            <div className="mb-3">
              <label htmlFor="edh" className="form-label">
                Hora final da vigência
              </label>
              <input
                disabled
                type="time"
                className="form-control"
                id="edh"
                name="edh"
                value={notification.edh}
                onChange={(e) => updateValue(e.target.name, e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-grid gap-2">
              <button
                type="submit"
                className="btn btn-primary mt-3"
                style={{ minWidth: 250 }}
              >
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
