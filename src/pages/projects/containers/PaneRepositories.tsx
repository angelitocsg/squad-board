import {
  IProjectRepository,
  TEnvironment,
} from "../../../models/IProjectRepository";
import ProjectRepoLine from "./RepoLine";

interface IProps {
  repositories?: IProjectRepository[];
  onChangeValue: (
    repositoryId?: string,
    name?: string,
    value?: string,
    environment?: TEnvironment
  ) => void;
}

const PaneRepositories = ({ repositories, onChangeValue }: IProps) => {
  return (
    <div className="table-responsive">
      <table className="table table-sm table-striped table-hover">
        <thead className="table-secondary">
          <tr>
            <th>Tipo</th>
            <th>Sigla App</th>
            <th>Repositório</th>
            <th>Sequência</th>
            <th>Develop</th>
            <th>Homolog</th>
            <th>Production</th>
            <th>Próximo deploy e observações</th>
          </tr>
        </thead>
        <tbody>
          {repositories?.map((repository) => (
            <ProjectRepoLine
              key={repository.id}
              repository={repository}
              onChangeValue={onChangeValue}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaneRepositories;
