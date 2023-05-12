import ClearCacheButton from "../../components/ClearCacheButton";
import DropFile from "../../components/DropFile";
import ImportBoardModal from "../../components/ImportBoardModal";
import NoContentPage from "../noContent";
import OverviewLine from "./containers/OverviewLine";
import useOverview from "./useOverview";

const OverviewPage = () => {
  const {
    addLine,
    removeLine,
    getFeatures,
    getUsers,
    getUserTasks,
    handleTaskValueChange,
    handleLoadFile,
    handleDownloadFile,
    handleClear,
  } = useOverview();

  return getUsers()?.length === 0 ? (
    <>
      <DropFile encoding="UTF-8" onLoadFile={handleLoadFile} />
      <NoContentPage title="Visão Geral" />
      <ClearCacheButton clear={handleClear} />
      <ImportBoardModal onUploadClick={handleLoadFile} />
    </>
  ) : (
    <div className="container-fluid pt-3 pb-2">
      <DropFile encoding="UTF-8" onLoadFile={handleLoadFile} />

      <ClearCacheButton clear={handleClear} />
      <ImportBoardModal
        onUploadClick={handleLoadFile}
        onDownloadClick={handleDownloadFile}
      />

      <section>
        <h1 className="h4">Alocações de objetivos</h1>

        <div className="row text-center">
          {getUsers().map((m) => (
            <div key={m.user} className="col">
              <div className="card mb-4 shadow-sm">
                <div className="card-header text-bg-dark small p-1">
                  {m.name}&nbsp;
                </div>
                <div
                  className={`card-body bg-opacity-75 ${
                    getUserTasks(m.user)?.length ? "bg-success" : "bg-warning"
                  }`}
                >
                  <span className="h3"> {getUserTasks(m.user)?.length}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h1 className="h4">Objetivos da sprint atual</h1>

        <button
          type="button"
          className="btn btn-sm btn-primary mb-3"
          style={{ minWidth: 150 }}
          onClick={addLine}
        >
          <i className="bi bi-plus-square"></i> adicionar
        </button>

        {getUsers().map((m) =>
          getUserTasks(m.user).length ? (
            <div key={m.user}>
              <h2 className="h6">{m.name}</h2>
              <table className="table table-sm p-0 table-hover">
                <tbody>
                  {getUserTasks(m.user).map((t) => (
                    <OverviewLine
                      key={t.id}
                      features={getFeatures()}
                      members={getUsers()}
                      task={t}
                      onRemoveLineClick={removeLine}
                      onTaskValueChange={handleTaskValueChange}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : undefined
        )}
      </section>
    </div>
  );
};

export default OverviewPage;
