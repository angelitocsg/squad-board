import {
  Tab,
  TabContent,
  TabContentGroup,
  TabGroup,
} from "../../../../components/Tab";
import PageLayout from "../../../../shared/PageLayout";
import ConteudoAtual from "./containers/ConteudoAtual";
import InOutNotificationJson from "./containers/InOutNotificationJson";
import ListaMfes from "./containers/ListaMfes";
import NotificacoesRegistradas from "./containers/NotificacoesRegistradas";

const NotificacoesPage = () => {
  return (
    <PageLayout title="Notificações">
      <InOutNotificationJson />

      <TabGroup>
        <Tab tabId="notificacao" active tabLabel="Notificações" />
        <Tab tabId="mfes" tabLabel="Microfrontends" />
        <Tab tabId="conteudo" tabLabel="Conteúdo" />
      </TabGroup>

      <TabContentGroup>
        <TabContent tabId="notificacao" active>
          <NotificacoesRegistradas />
        </TabContent>
        <TabContent tabId="mfes">
          <ListaMfes />
        </TabContent>
        <TabContent tabId="conteudo">
          <ConteudoAtual />
        </TabContent>
      </TabContentGroup>
    </PageLayout>
  );
};

export default NotificacoesPage;
