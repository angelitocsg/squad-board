import useSettings from "./useSettings";

const SettingsPage = () => {
  const { features_text, invalid_json, settings, updateValue } = useSettings();

  return (
    <section className="container mt-4">
      <h1 className="h4 mb-3">Configurações</h1>
      <div className="row">
        <div className="col">
          <div className="mb-3">
            <label htmlFor="v" className="form-label">
              Link arquivo tarefas
            </label>
            <input
              type="text"
              className="form-control"
              id="board_source"
              name="board_source"
              value={settings.board_source}
              onChange={(e) => updateValue(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div className="col">
          <div className="mb-3">
            <label htmlFor="v" className="form-label">
              Link pesquisa de tarefas externas
            </label>
            <input
              type="text"
              className="form-control"
              id="board_external_search"
              name="board_external_search"
              value={settings.board_external_search}
              onChange={(e) => updateValue(e.target.name, e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="mb-3">
            <label htmlFor="features" className="form-label">
              Features (JSON)
            </label>
            <textarea
              style={{ fontFamily: "courier", fontSize: 12, minHeight: 180 }}
              className={`form-control ${invalid_json ? "is-invalid" : ""}`}
              id="features"
              name="features"
              rows={8}
              value={settings.features}
              placeholder="[{id:'FETR-0001', label: 'COMUNICAÇÃO'}]"
              onChange={(e) => updateValue(e.target.name, e.target.value)}
            ></textarea>
            <span className="text-danger">{invalid_json}</span>
          </div>
        </div>
        <div className="col">
          <div className="mb-3">
            <label htmlFor="respostaInput" className="form-label">
              Features (board)
            </label>
            <div
              dangerouslySetInnerHTML={{
                __html: features_text ,
              }}
              className="form-control text-bg-light"
              style={{
                minHeight: 180,
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingsPage;
