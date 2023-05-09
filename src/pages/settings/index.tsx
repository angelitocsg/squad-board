import useSettings from "./useSettings";

const SettingsPage = () => {
  const { settings, updateValue } = useSettings();

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
      </div>
    </section>
  );
};

export default SettingsPage;
