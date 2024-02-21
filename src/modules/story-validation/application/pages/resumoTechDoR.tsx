import { useEffect, useState } from "react";

import StoryModel from "../data/StoryModel";
import { render, renderRequired } from "./useController";

interface IProps {
  state: StoryModel;
}

const ResumoTechDoR = ({ state }: IProps) => {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    setHidden(
      !document.getElementById("lista-resumo-tech-dor")?.childElementCount,
    );
  }, [state.techDefinitionOfReady]);

  return (
    <div className="mb-3">
      <h3 className={`h6 ${hidden && "d-none"}`}>DoR - Visão tecnologia</h3>
      <ul id="lista-resumo-tech-dor" className="small m-0">
        {renderRequired(!state.techDefinitionOfReady.contagemBcp, [
          "[Desenvolvedor] Efetuar contagem de BCP antes de iniciar a tarefa",
        ])}
        {renderRequired(!state.techDefinitionOfReady.refinamento, [
          "[Desenvolvedor] O refinamento deve estar pronto para iniciar o desenvolvimento",
        ])}
        {renderRequired(!state.techDefinitionOfReady.contratoApi, [
          "[Desenvolvedor] O contrato das APIs devem estar prontos para iniciar o desenvolvimento",
        ])}
        {render(!state.techDefinitionOfReady.massaDeTesteEMock, [
          "[Desenvolvedor] As massas para mock dos testes automatizados devem estar disponíveis antes de finalizar o desenvolvimento",
        ])}
        {renderRequired(!state.techDefinitionOfReady.escopoRequisitos, [
          "[Negócio] Revisar escopo e requisitos da história",
        ])}
        {renderRequired(!state.techDefinitionOfReady.iteracaoDependencias, [
          "[Desenvolvedor] Revisar no refinamento as iterações e dependências de outros recursos",
        ])}
        {renderRequired(!state.techDefinitionOfReady.ambienteProvisionado, [
          "[Desenvolvedor] O ambiente precisa ser provisionado com prioridade",
        ])}
        {render(!state.techDefinitionOfReady.desenhoSolucaoTecnica, [
          "[Desenvolvedor] Pode ser utilizado uma desenho de solução padrão",
        ])}
        {render(!state.techDefinitionOfReady.modelagemNegocio, [
          "[Negócio] Se possível criar um fluxograma do processo e regras de negócio",
        ])}
        {render(!state.techDefinitionOfReady.featureToggle, [
          "[Desenvolvedor] Considerar sempre a implementação de feature toggle para novas funcionalidades ou modificação das mesmas",
        ])}
      </ul>
    </div>
  );
};

export default ResumoTechDoR;
