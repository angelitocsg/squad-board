import StoryModel from "../data/StoryModel";
import { render, renderRequired } from "./useController";

interface IProps {
  state: StoryModel;
}

const ResumoTechDoD = ({ state }: IProps) => {
  return (
    <div className="mb-3">
      <h3 className="h6">DoD - Geral</h3>
      <ul id="lista-resumo-tech-dor" className="small m-0">
        {renderRequired(!state.techDefinitionOfDone.criterioDeAceite, [
          "[Desenvolvedor] Revisar critérios de aceite",
        ])}
        {renderRequired(!state.techDefinitionOfDone.codeReview, [
          "[Desenvolvedor] Outro desenvolvedor deve fazer o code review antes de enviar códigos para DEV e HOM",
        ])}
        {renderRequired(!state.techDefinitionOfDone.envVarDevHomProd, [
          "[Desenvolvedor] As variáveis devem ser validadas em todos os ambientes, se possível, antes do deploy em produção",
        ])}
      </ul>
    </div>
  );
};

export default ResumoTechDoD;
