import BadgeHelper from '../../../helpers/badge.helper';
import { IProjectRepository } from '../../../models/IProjectRepository';

interface IProps {
  repository: IProjectRepository;
}

const ProjectRepoLine = ({ repository }: IProps) => {
  return (
    <tr key={repository.id}>
      <td>{repository.type}</td>
      <td>
        <a
          href={`http://github.com/${repository.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {repository.id}
        </a>
      </td>
      <td>{repository.deploy_sequence}</td>
      <td>
        <span className={BadgeHelper.getBadgeClass(repository.environments.production?.status)}>
          {repository.environments.develop?.deploy_date}
        </span>
      </td>
      <td>
        <span className={BadgeHelper.getBadgeClass(repository.environments.production?.status)}>
          {repository.environments.homolog?.deploy_date}
        </span>
      </td>
      <td>
        <span className={BadgeHelper.getBadgeClass(repository.environments.production?.status)}>
          {repository.environments.production?.deploy_date}
        </span>
      </td>
      <td>
        <span className="text-danger">{repository.blocks}</span>
      </td>
    </tr>
  );
};

export default ProjectRepoLine;
