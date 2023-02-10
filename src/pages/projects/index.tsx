import DropFile from "../../components/DropFile";
import {
  Tab,
  TabContent,
  TabContentGroup,
  TabGroup,
} from "../../components/Tab";
import PaneGmud from "./containers/PaneGmud";
import PaneRepositories from "./containers/PaneRepositories";
import useProject from "./useProject";
import parse from "html-react-parser";
const Projects = () => {
  const { projects, limparDados, getGmuds, getAsMarkdown, handleLoadFile } = useProject();

  return projects.length === 0 ? (
    <DropFile encoding="UTF-8" onLoadFile={handleLoadFile} />
  ) : (
    <div className="container-fluid pt-3 pb-2">
      <DropFile encoding="UTF-8" onLoadFile={handleLoadFile} />

      <button
        type="button"
        className="btn btn-sm btn-link"
        onClick={limparDados}
      >
        Limpar dados
      </button>

      {projects.map((project) => (
        <section key={project.id} className="mb-5">
          <h1 className="h4 pb-3">{project.name}</h1>
          <TabGroup>
            <Tab
              active={true}
              tabId={`${project.id}-repositories`}
              tabLabel="Repositórios"
            />
            <Tab active={false} tabId={`${project.id}-gmud`} tabLabel="GMUD" />
            <Tab
              active={false}
              tabId={`${project.id}-features`}
              tabLabel="Funcionalidades"
            />
            <Tab
              active={false}
              tabId={`${project.id}-monitoring`}
              tabLabel="Monitoramento"
            />
          </TabGroup>

          <TabContentGroup>
            <TabContent active={true} tabId={`${project.id}-repositories`}>
              <PaneRepositories repositories={project.repositories} />
            </TabContent>

            <TabContent tabId={`${project.id}-gmud`}>
              <PaneGmud gmuds={getGmuds(project.id)} />
            </TabContent>
            <TabContent tabId={`${project.id}-features`}>
              {parse(getAsMarkdown(project.description))}
            </TabContent>

            <TabContent tabId={`${project.id}-monitoring`}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Serviço</th>
                    <th>Desenvolvimento</th>
                    <th>Homologação</th>
                    <th>Produção</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </TabContent>
          </TabContentGroup>
        </section>
      ))}
    </div>
  );
};

export default Projects;
