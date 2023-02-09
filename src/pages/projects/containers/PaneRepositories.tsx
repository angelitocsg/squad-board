import { IProjectRepository } from '../../../models/IProjectRepository';
import ProjectRepoLine from './RepoLine';

interface IProps {
  repositories?: IProjectRepository[];
}

const PaneRepositories = ({ repositories }: IProps) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Repositório</th>
          <th>Sequência</th>
          <th>Develop</th>
          <th>Homolog</th>
          <th>Production</th>
          <th>Impedimento</th>
        </tr>
      </thead>
      <tbody>
        {repositories?.map((repository) => (
          <ProjectRepoLine key={repository.id} repository={repository} />
        ))}
      </tbody>
    </table>
  );
};

export default PaneRepositories;
