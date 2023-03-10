import DOMPurify from "dompurify";
import { marked } from "marked";

import BadgeStatus from "../../../components/BadgeStatus";
import {
  EnvironmentEnum,
  IProjectRepository,
  TEnvironment,
} from "../../../models/IProjectRepository";
import { TGmudStatus } from "../../../types/TGmudStatus";

interface IProps {
  repository: IProjectRepository;
  onChangeValue: (
    repositoryId?: string,
    name?: string,
    value?: string,
    environment?: TEnvironment
  ) => void;
}

const ProjectRepoLine = ({ repository, onChangeValue }: IProps) => {
  const handleStatusChange = (
    status: TGmudStatus,
    environment: TEnvironment
  ) => {
    onChangeValue &&
      onChangeValue(repository.id, "status", status, environment);
  };

  const handleDevelopStatusChange = (status: TGmudStatus) =>
    handleStatusChange(status, EnvironmentEnum.DEVELOP);

  const handleHomologStatusChange = (status: TGmudStatus) =>
    handleStatusChange(status, EnvironmentEnum.HOMOLOG);

  const handleProductionStatusChange = (status: TGmudStatus) =>
    handleStatusChange(status, EnvironmentEnum.PRODUCTION);

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
        <BadgeStatus
          status={repository.environments.develop?.status}
          onChange={handleDevelopStatusChange}
        />
      </td>
      <td>
        <BadgeStatus
          status={repository.environments.homolog?.status}
          onChange={handleHomologStatusChange}
        />
      </td>
      <td>
        <BadgeStatus
          status={repository.environments.production?.status}
          onChange={handleProductionStatusChange}
        />
      </td>
      <td>
        <span
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(marked.parse(repository.blocks ?? "")),
          }}
          className="small"
        ></span>
      </td>
    </tr>
  );
};

export default ProjectRepoLine;
