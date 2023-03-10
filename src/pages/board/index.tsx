import BoardCard from "../../components/BoardCard";
import BoardColumn from "../../components/BoardColumn";
import BoardColumnStatus from "../../components/BoardColumnStatus";
import ClearCacheButton from "../../components/ClearCacheButton";
import DropFile from "../../components/DropFile";
import Header from "../../components/Header";
import ImportBoardModal from "../../components/ImportBoardModal";
import { PriorityEnum } from "../../interfaces/BoardIssues";
import NoContentPage from "../noContent";
import BoardCards from "./containers/Cards";
import useBoard from "./useBoard";

const BoardPage = () => {
  const {
    assignee_selected,
    status_selected,
    story_points,
    bd_sprint_name,
    bd_status,
    bd_assignees,
    show_by,
    handleGroupBy,
    handleFilterAssignee,
    handleFilterByStatus,
    handleFileUpload,
    getStatus,
    getTotalTasks,
  } = useBoard();

  return show_by.length === 0 ? (
    <>
      <DropFile encoding="UTF-8" onLoadFile={handleFileUpload} />
      <NoContentPage title="Painel Tarefas" />
      <ClearCacheButton />
      <ImportBoardModal onUploadClick={handleFileUpload} />
    </>
  ) : (
    <main id="main" className="container-fluid p-0">
      <DropFile encoding="iso-8859-1" onLoadFile={handleFileUpload} />
      <ClearCacheButton />
      <ImportBoardModal onUploadClick={handleFileUpload} />

      <Header
        assigneeSelected={assignee_selected}
        sprintName={bd_sprint_name}
        storyPoints={story_points}
        totalTasks={getTotalTasks()}
        assignees={bd_assignees.map((it) => it.assignee)}
        onGroupByClick={handleGroupBy}
        onFilterAssigneeClick={handleFilterAssignee}
      />

      <section className="flex-column d-inline-block w-100">
        <BoardColumnStatus
          statusSelected={status_selected}
          statusList={getStatus()}
          onStatusClick={handleFilterByStatus}
        />

        {show_by.map((item) => {
          return (item.issues?.length ?? 0) === 0 ? undefined : (
            <div key={item.id}>
              <BoardColumn>
                <BoardCard
                  description={item.description}
                  assignee={item.assignee}
                  id={item.id}
                  type={item.type}
                  priority={item.priority ?? PriorityEnum.MEDIUM}
                  status={item.status}
                  story_points={item.story_points}
                  group={(item.issues?.length ?? 0) > 0 ?? false}
                  hidden={(item.issues?.length ?? 0) === 0}
                  data-bs-toggle="collapse"
                  data-bs-target={`#${item.id}`}
                  aria-expanded="false"
                  aria-controls={`${item.id}`}
                />
              </BoardColumn>

              <div id={`${item.id}`} className="collapse">
                <div className="d-flex">
                  {bd_status.map((st) => {
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

        {show_by.length > 0 &&
          show_by.filter((f) => f.issues?.length === 0).length > 0 && (
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
                  aria-expanded="false"
                  aria-controls={"OTHERS"}
                />
              </BoardColumn>

              <div id="OTHERS" className="collapse">
                <div className="d-flex">
                  {bd_status.map((st) => {
                    const issues = show_by
                      .filter((f) => (f.issues?.length ?? 0) === 0)
                      .filter((f) => f.status === st.status);
                    return (
                      <BoardColumn key={"OTHERS" + st.status}>
                        <BoardCards
                          item={{
                            id: "OTHERS",
                            assignee: "",
                            issues: issues,
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
