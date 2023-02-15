import BadgeHelper from "../../../helpers/badge.helper";
import { IProjectRepository } from "../../../models/IProjectRepository";

interface IProps {
  repository: IProjectRepository;
}

const ProjectRepoLine = ({ repository }: IProps) => {
  return (
    <tr key={repository.id}>
      <td>{repository.type}</td>
      <td>{repository.sigla_app}</td>
      <td>
        <a
          href={`http://github.com/${repository.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {repository.id.split("/")[1]}
        </a>
      </td>
      <td>{repository.deploy_sequence}</td>
      <td>
        <span
          style={{ minWidth: 83 }}
          className={BadgeHelper.getBadgeClass(
            repository.environments.develop?.status
          )}
        >
          {repository.environments.develop?.deploy_date}
        </span>
      </td>
      <td>
        <span
          style={{ minWidth: 83 }}
          className={BadgeHelper.getBadgeClass(
            repository.environments.homolog?.status
          )}
        >
          {repository.environments.homolog?.deploy_date}
        </span>
      </td>
      <td>
        <span
          style={{ minWidth: 83 }}
          className={BadgeHelper.getBadgeClass(
            repository.environments.production?.status
          )}
        >
          {repository.environments.production?.deploy_date}
        </span>
      </td>
      <td>
        <span className="small text-danger">{repository.blocks}</span>
      </td>
    </tr>
  );
};

export default ProjectRepoLine;
