import parse from "html-react-parser";

import DropFile from "../../components/DropFile";
import {
  Tab,
  TabContent,
  TabContentGroup,
  TabGroup,
} from "../../components/Tab";
import PaneGmud from "./containers/PaneGmud";
import PaneMonitoring from "./containers/PaneMonitoring";
import PaneRepositories from "./containers/PaneRepositories";
import SummaryIndicators from "./containers/SummaryIndicators";
import useProject from "./useProject";

const Projects = () => {
  const {
    projects,
    summary_indicators,
    limparDados,
    getGmuds,
    getMonitoring,
    getAsMarkdown,
    handleLoadFile,
  } = useProject();

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

      <SummaryIndicators indicators={summary_indicators} />

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
              <PaneMonitoring monitoring={getMonitoring(project.id)} />
            </TabContent>
          </TabContentGroup>
        </section>
      ))}
    </div>
  );
};

export default Projects;
