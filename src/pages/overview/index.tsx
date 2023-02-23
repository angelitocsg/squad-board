import ClearCacheButton from "../../components/ClearCacheButton";
import DropFile from "../../components/DropFile";
import ImportBoardModal from "../../components/ImportBoardModal";
import NoContentPage from "../noContent";
import OverviewLine from "./containers/OverviewLine";
import useOverview from "./useOverview";

const OverviewPage = () => {
  const {
    overview_members,
    overview_tasks,
    addLine,
    removeLine,
    handleTaskValueChange,
    handleLoadFile,
    handleDownloadFile,
  } = useOverview();

  return overview_members?.length === 0 ? (
    <>
      <DropFile encoding="UTF-8" onLoadFile={handleLoadFile} />
      <NoContentPage title="Visão Geral" />
      <ClearCacheButton />
      <ImportBoardModal onUploadClick={handleLoadFile} />
    </>
  ) : (
    <div className="container-fluid pt-3 pb-2">
      <DropFile encoding="UTF-8" onLoadFile={handleLoadFile} />

      <ClearCacheButton />
      <ImportBoardModal
        showExport={true}
        onUploadClick={handleLoadFile}
        onDownloadClick={handleDownloadFile}
      />

      <section>
        <div>
          {overview_members.map((m) => (
            <span key={m.user} className="badge text-bg-secondary me-2">
              {m.name}{" "}
              <span className="badge text-bg-warning">
                {overview_tasks.filter((t) => t.user === m.user)?.length}
              </span>
            </span>
          ))}
        </div>

        <button
          type="button"
          className="btn btn-sm btn-primary mb-3 mt-3"
          onClick={addLine}
        >
          Adicionar linha
        </button>

        <table className="table table-sm  table-hover">
          <thead className="table-secondary">
            <tr>
              <th>Ordem</th>
              <th>Prioridade</th>
              <th>Tarefa</th>
              <th>Observações</th>
              <th>Membro</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {overview_tasks.map((t) => (
              <OverviewLine
                key={t.id}
                members={overview_members}
                task={t}
                onRemoveLineClick={removeLine}
                onTaskValueChange={handleTaskValueChange}
              />
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default OverviewPage;
