import useSettings from "./useSettings";

const SettingsPage = () => {
  const { features, features_text, invalid_json, settings, updateValue } =
    useSettings();

  return (
    <section className="container mt-4">
      <h1 className="h4 mb-3">Configurações</h1>
      <div className="row">
        <div className="col">
          <div className="mb-3">
            <label
              htmlFor="v"
              title="board_external_search"
              className="form-label">
              Link pesquisa de tarefas externas (id da tarefa adicionado ao
              final do link)
            </label>
            <input
              type="text"
              className="form-control"
              id="board_external_search"
              name="board_external_search"
              value={settings.board_external_search}
              placeholder="https://link-da-pesquisa/"
              onChange={(e) => updateValue(e.target.name, e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="mb-3">
            <label htmlFor="features" title="features" className="form-label">
              Features com descrição (JSON)
            </label>
            <textarea
              style={{ fontFamily: "courier", fontSize: 12, minHeight: 180 }}
              className={`form-control ${invalid_json ? "is-invalid" : ""}`}
              id="features"
              name="features"
              rows={8}
              value={features}
              placeholder="[{id:'FETR-0001', label: 'COMUNICAÇÃO'}]"
              onChange={(e) =>
                updateValue(e.target.name, e.target.value)
              }></textarea>
            <span className="text-danger">{invalid_json}</span>
          </div>
        </div>
        <div className="col">
          <div className="mb-3">
            <label
              htmlFor="respostaInput"
              title="features_text"
              className="form-label">
              Features importadas no [Tarefas]
            </label>
            <pre
              className="form-control text-bg-light"
              style={{ minHeight: 180, fontSize: "0.75rem" }}>
              {features_text}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingsPage;
