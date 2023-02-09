import { IProjectRepository } from "../../../models/IProjectRepository";

interface IProps {
  repository: IProjectRepository;
}

const ProjectRepoLine = ({ repository: project }: IProps) => (
  <tr key={project.id}>
    <td>{project.type}</td>
    <td>
      <a
        href={`http://github.com/${project.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {project.id}
      </a>
    </td>
    <td>{project.deploy_sequence}</td>
    <td>
      <span className="badge text-bg-dark opacity">
        {project.environments.develop?.deploy_date}
      </span>
    </td>
    <td>
      <span className="badge text-bg-dark opacity">
        {project.environments.homolog?.deploy_date}
      </span>
    </td>
    <td>
    <span className="badge text-bg-dark opacity">
        {project.environments.production?.deploy_date}
      </span>
    </td>
    <td>
      <span className="text-danger">{project.blocks}</span>
    </td>
  </tr>
);

export default ProjectRepoLine;
