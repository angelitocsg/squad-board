import DropFile from "../DropFile";
import HeaderFilterBy from "./containers/FilterBy";
import HeaderGroupBy from "./containers/GroupBy";
import StoryPoint from "./containers/StoryPoint";
import useHeader from "./useHeader";

interface IProps {
  sprintName: string;
  storyPoints: number;
  assignees?: string[];
  onGroupByClick: (opt: number) => void;
  onFilterAssigneeClick: (assignee: string) => void;
}

const Header = ({
  sprintName,
  storyPoints,
  assignees,
  onGroupByClick,
  onFilterAssigneeClick,
}: IProps) => {
  const {
    group_selected,
    assignee_selected,
    handleGroupByClick,
    handleFilterAssigneeClick,
    handleFileUpload,
    limparDados,
  } = useHeader({ onGroupByClick, onFilterAssigneeClick });

  return (
    <section className="text-center mt-2 mb-4">
      <DropFile encoding="iso-8859-1" onLoadFile={handleFileUpload} />

      <div>
        <div className="d-inline-flex align-items-center me-5">
          <small>
            <strong>{sprintName}</strong>
          </small>
        </div>

        <HeaderGroupBy
          onGroupByClick={handleGroupByClick}
          groupSelected={group_selected}
        />

        <div className="d-inline-flex mx-3 text-secondary">|</div>

        <StoryPoint storyPoints={storyPoints} />

        <div className="d-inline-flex mx-3 text-secondary">|</div>

        <div className="d-inline-flex align-items-center">
          <small className="me-2">Ações:</small>
          <div>
            <button
              type="button"
              className="btn btn-sm btn-link"
              data-bs-toggle="modal"
              data-bs-target="#importBoard"
            >
              Importar Board
            </button>
            <button
              type="button"
              className="btn btn-sm btn-link"
              onClick={limparDados}
            >
              Limpar dados
            </button>
          </div>
        </div>
      </div>

      <HeaderFilterBy
        assignees={assignees}
        assigneeSelected={assignee_selected}
        onFilterAssigneeClick={handleFilterAssigneeClick}
      />
    </section>
  );
};

export default Header;
