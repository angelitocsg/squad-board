import { IProjectGmud } from "../../../models/IProjectGmud";
import PaneGmud from "./PaneGmud";

interface IProps {
  gmuds: IProjectGmud[];
}

const SummaryActiveGmuds = ({ gmuds }: IProps) => {
  return gmuds && gmuds.length > 0 ? (
    <div id="active-gmuds">
      <h1 className="h4 pb-2">GMUDs ativas / previsão de publicação</h1>
      <h2 className="h6">Todo:</h2>
      <ul>
        <li>Encerrar tarefa de validação durante a janela de publicação</li>
        <li>Encerrar GMUD após a janela de publicação (dia seguinte)</li>
        <li>Concluir merge para branch main após validação da publicação</li>
      </ul>
      <div className="border bg-white p-3 mb-5">
        <PaneGmud
          gmuds={gmuds}
          onChangeValue={() => {}}
          segmentBy="projectName"
        />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default SummaryActiveGmuds;
