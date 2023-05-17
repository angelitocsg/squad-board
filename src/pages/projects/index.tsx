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
import TopButton from "../../components/TopButton";
import NoContentPage from "../noContent";
import PaneGmud from "./containers/PaneGmud";
import PaneMonitoring from "./containers/PaneMonitoring";
import PaneRepositories from "./containers/PaneRepositories";
import PentestSummary from "./containers/PentestSummary";
import SummaryActiveGmuds from "./containers/SummaryActiveGmuds";
import SummaryIndicators from "./containers/SummaryIndicators";
import useProject from "./useProject";

const ProjectsPage = () => {
  const {
    getGmudsSummary,
    getAppRepositories,
    getProjects,
    getRepositories,
    getGmuds,
    getActiveGmuds,
    getMonitoring,
    getAsMarkdown,
    handleLoadFile,
    handleDownloadFile,
    handleClear,
  } = useProject();

  return getProjects().length === 0 ? (
    <>
      <DropFile encoding="UTF-8" onLoadFile={handleLoadFile} />
      <NoContentPage title="Aplicações" />
      <ClearCacheButton clear={handleClear} />
      <ImportBoardModal onUploadClick={handleLoadFile} />
    </>
  ) : (
    <div className="container-fluid pt-3 pb-2">
      <DropFile encoding="UTF-8" onLoadFile={handleLoadFile} />

      <ClearCacheButton clear={handleClear} />
      <TopButton />
      <ImportBoardModal
        onUploadClick={handleLoadFile}
        onDownloadClick={handleDownloadFile}
      />

      <SummaryIndicators indicators={getGmudsSummary()} />

      <div id="section-list" className="mb-3">
        <a className="badge p-2 bg-secondary nav-link" href="#active-gmuds">
          GMUDs ativas / previsão de publicação
        </a>
        &nbsp;
        <a className="badge p-2 bg-secondary nav-link" href="#pentest-status">
          Status de Pentest
        </a>
        &nbsp;
        {getProjects()
          .filter((p) => p.id)
          .map((p) => (
            <span key={p.id} className="pe-1">
              <a className="badge p-2 bg-secondary nav-link" href={`#${p.id}`}>
                {p.name?.replace("Aplicação: ", "")}
              </a>
            </span>
          ))}
      </div>

      <div
        data-bs-spy="scroll"
        data-bs-target="#section-list"
        data-bs-offset="0"
        data-bs-smooth-scroll="true"
        tabIndex={0}
      >
        <SummaryActiveGmuds gmuds={getActiveGmuds()} />

        <PentestSummary repositories={getAppRepositories()} />

        {getProjects().map((project, i) => (
          <section id={project.id} key={i} className="mb-5">
            <h1 className="h4 pb-3">{project.name}</h1>
            <TabGroup>
              <Tab
                active={true}
                tabId={`${project.id}-repositories`}
                tabLabel="Repositórios"
              />
              <Tab
                active={false}
                tabId={`${project.id}-gmud`}
                tabLabel="GMUD"
              />
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
                  onChangeValue={() => {}}
                />
              </TabContent>

              <TabContent tabId={`${project.id}-gmud`}>
                <PaneGmud
                  gmuds={getGmuds(project.id)}
                  segmentBy="repositoryId"
                  onChangeValue={() => {}}
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
    </div>
  );
};

export default ProjectsPage;
