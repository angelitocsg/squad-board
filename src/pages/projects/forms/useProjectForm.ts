import { useEffect, useState } from "react";
import { IProject } from "../../../models/IProjects";
import { useService } from "../../../di/DecouplerContext";
import { ProjectRepository } from "../../../repository/ProjectRepository";

const emptyProject: IProject = {
  id: "app-",
  name: "Aplicação: ...",
  description: "",
  repositories: [],
  monitoring: [],
};

export interface IProps {
  currentProject?: IProject;
}

const useProjectForm = ({ currentProject }: IProps) => {
  const repository = useService<ProjectRepository>("ProjectRepository");

  const [project, set_project] = useState(currentProject ?? emptyProject);

  useEffect(() => {
    set_project(currentProject ?? emptyProject);
  }, [currentProject]);

  const handleSave = () => {
    repository.updateProject(project);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleChange = (e: any) => {
    set_project({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  return {
    project,
    handleSave,
    handleChange,
  };
};

export default useProjectForm;
