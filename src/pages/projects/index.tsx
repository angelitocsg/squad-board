import parse from "html-react-parser";

import ClearCacheButton from "../../components/ClearCacheButton";
import DropFile from "../../components/DropFile";
import ImportBoardModal from "../../components/ImportBoardModal";
import {
  Tab,
  TabContent,
  TabContentGroup,
  TabGroup,
} from "../../components/Tab";
import NoContentPage from "../noContent";
import PaneGmud from "./containers/PaneGmud";
import PaneMonitoring from "./containers/PaneMonitoring";
import PaneRepositories from "./containers/PaneRepositories";
import SummaryIndicators from "./containers/SummaryIndicators";
import useProject from "./useProject";

const ProjectsPage = () => {
  const {
    summary_indicators,
    getProjects,
    getRepositories,
    getGmuds,
    getMonitoring,
    getAsMarkdown,
    handleLoadFile,
    handleDownloadFile,
    handleGmudValueChange,
    handleRepositoryValueChange,
  } = useProject();

  return getProjects().length === 0 ? (
    <>
      <DropFile encoding="UTF-8" onLoadFile={handleLoadFile} />
      <NoContentPage title="Aplicações" />
      <ClearCacheButton />
      <ImportBoardModal onUploadClick={handleLoadFile} />
    </>
  ) : (
    <div className="container-fluid pt-3 pb-2">
      <DropFile encoding="UTF-8" onLoadFile={handleLoadFile} />

      <ClearCacheButton />
      <ImportBoardModal
        onUploadClick={handleLoadFile}
        onDownloadClick={handleDownloadFile}
      />

      <SummaryIndicators indicators={summary_indicators} />

      {getProjects().map((project) => (
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
              <PaneRepositories
                repositories={getRepositories(project.id)}
                onChangeValue={handleRepositoryValueChange}
              />
            </TabContent>

            <TabContent tabId={`${project.id}-gmud`}>
              <PaneGmud
                gmuds={getGmuds(project.id)}
                onChangeValue={handleGmudValueChange}
              />
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

export default ProjectsPage;
