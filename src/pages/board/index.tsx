import BoardCard from "../../components/BoardCard";
import BoardColumn from "../../components/BoardColumn";
import BoardColumnStatus from "../../components/BoardColumnStatus";
import ClearCacheButton from "../../components/ClearCacheButton";
import DropFile from "../../components/DropFile";
import Header from "../../components/Header";
import ImportBoardModal from "../../components/ImportBoardModal";
import { PriorityEnum } from "../../enums/PriorityEnum";
import NoContentPage from "../noContent";
import BoardCards from "./containers/Cards";
import useBoard from "./useBoard";

const BoardPage = () => {
  const {
    assignees,
    assignee_selected,
    features,
    feature_selected,
    issues,
    issues_hidden,
    issue_types,
    sprint_name,
    status,
    status_selected,
    story_points,
    total_tasks,
    handleFilterAssignee,
    handleFilterByStatus,
    handleFilterFeature,
    handleFilterIssueType,
    handleFileUpload,
    handleClear,
  } = useBoard();

  return issues.length === 0 && story_points.total === 0 ? (
    <>
      <DropFile encoding="UTF-8" onLoadFile={handleFileUpload} />
      <NoContentPage title="Painel Tarefas" />
      <ClearCacheButton clear={handleClear} />
      <ImportBoardModal onUploadClick={handleFileUpload} />
    </>
  ) : (
    <main id="main" className="container-fluid p-0">
      <DropFile encoding="iso-8859-1" onLoadFile={handleFileUpload} />
      <ClearCacheButton clear={handleClear} />
      <ImportBoardModal onUploadClick={handleFileUpload} />

      <Header
        sprintName={sprint_name}
        storyPoints={story_points}
        totalTasks={total_tasks}
        assignees={assignees.map((it) => it.name)}
        features={features}
        assigneeSelected={assignee_selected}
        featureSelected={feature_selected}
        issueTypes={issue_types}
        issueTypesSelected={issues_hidden}
        onFilterAssigneeClick={handleFilterAssignee}
        onFilterFeatureClick={handleFilterFeature}
        onFilterIssueType={handleFilterIssueType}
      />

      <section className="flex-column d-inline-block w-100">
        <BoardColumnStatus
          statusSelected={status_selected}
          statusList={status}
          onStatusClick={handleFilterByStatus}
        />

        {issues.map((item) => {
          return (item.issues?.length ?? 0) === 0 ? undefined : (
            <div key={item.id}>
              <BoardColumn>
                <BoardCard
                  description={item.description}
                  assignee={item.assignee}
                  id={item.id}
                  parent_id={item.parent_id}
                  type={item.type}
                  priority={item.priority ?? PriorityEnum.MEDIUM}
                  status={item.status}
                  story_points={item.story_points}
                  group={(item.issues?.length ?? 0) > 0 ?? false}
                  hidden={(item.issues?.length ?? 0) === 0}
                />
              </BoardColumn>

              <div id={`${item.id}`} className="collapse">
                <div className="d-flex">
                  {status.map((st) => {
                    return (
                      <BoardColumn key={item.id + st.status}>
                        <BoardCards item={item} status={st} />
                      </BoardColumn>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {issues.length > 0 &&
          issues.filter((f) => f.issues?.length === 0).length > 0 && (
            <div>
              <BoardColumn>
                <BoardCard
                  description="OUTROS ITENS"
                  id=""
                  type="other"
                  priority={PriorityEnum.MEDIUM}
                  group={true}
                  data-bs-toggle="collapse"
                  data-bs-target={"#OTHERS"}
                  aria-expanded="true"
                  aria-controls={"OTHERS"}
                />
              </BoardColumn>

              <div id="OTHERS" className="collapse show">
                <div className="d-flex">
                  {status.map((st) => {
                    const _issues = issues
                      .filter((f) => (f.issues?.length ?? 0) === 0)
                      .filter((f) => f.status === st.status);
                    return (
                      <BoardColumn key={"OTHERS" + st.status}>
                        <BoardCards
                          item={{
                            id: "OTHERS",
                            assignee: "",
                            issues: _issues,
                          }}
                          status={st}
                        />
                      </BoardColumn>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
      </section>
    </main>
  );
};

export default BoardPage;
