import { useService } from "../../../../di/DecouplerContext";
import PageLayout from "../../../../shared/PageLayout";
import AppModalService from "../components/AppModal/AppModalService";
import GmudModel from "../viewModel/GmudModel";
import GmudCreatePage from "./create";
import GmudStore from "../stores/GmudStore";
import Gmud from "../../domain/entity/Gmud";
import GmudDAO from "../repository/GmudDAO";
import { useEffect, useState } from "react";

const GestaoMudancaHome = () => {
  const modalService = useService<AppModalService>("AppModalService");
  const gmudStore = useService<GmudStore>("GmudStore");
  const gmudDAO = useService<GmudDAO>("GmudDAOLocalStorage");

  const handleCreate = () => {
    try {
      const model = gmudStore.current;
      const gmud = Gmud.create(model.story, model.repositoryId, model.version);
      if (model.number && model.link)
        gmud.register(model.number, model.link, model.version);
      if (model.date && model.time)
        gmud.schedule(model.date, model.time, model.version);
      gmudDAO.create(gmud);
    } catch (e: any) {
      console.log(e.message);
      throw e
    }
  };
  const onClickNova = () => {
    const model = new GmudModel("github.com/angelitocsg");
    modalService
      .config({
        title: "nova mudança",
        size: "large",
        buttonOkLabel: "Criar",
        buttonOkAction: handleCreate,
        children: () => (
          <GmudCreatePage
            data={model}
            onChange={(state) => {
              gmudStore.updateCurrent(state);
            }}
          />
        ),
      })
      .open();
  };

  const [gmuds, setGmuds] = useState<any[]>([]);
  useEffect(() => {
    setGmuds(gmudDAO.getAll() ?? []);
  }, [gmudDAO]);

  return (
    <PageLayout title="Gestão de mudanças">
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#appModal"
        onClick={onClickNova}
      >
        Nova
      </button>
      {gmuds &&
        gmuds.map((x, i) => <pre key={i}>{JSON.stringify(x, null, 2)}</pre>)}
    </PageLayout>
  );
};

export default GestaoMudancaHome;
