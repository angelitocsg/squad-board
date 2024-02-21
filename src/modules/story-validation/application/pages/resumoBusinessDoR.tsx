import { useEffect, useState } from "react";

import StoryModel from "../data/StoryModel";
import { render, renderRequired } from "./useController";

interface IProps {
  state: StoryModel;
}

const ResumoBusinessDoR = ({ state }: IProps) => {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    setHidden(
      !document.getElementById("lista-resumo-business-dor")?.childElementCount,
    );
  }, [state.businessDefinitionOfReady]);

  return (
    <div className="mb-3">
      <h3 className={`h6 ${hidden && "d-none"}`}>DoR - Visão negócio</h3>
      <ul id="lista-resumo-business-dor" className="small m-0">
        {renderRequired(!state.businessDefinitionOfReady.titulo, [
          "[Negócio] Revisar título da história",
        ])}
        {renderRequired(!state.businessDefinitionOfReady.descricao, [
          "[Negócio] Revisar descrição da história",
        ])}
        {renderRequired(!state.businessDefinitionOfReady.criterioAceite, [
          "[Negócio] Revisar critério(s) de aceite",
        ])}
        {render(!state.businessDefinitionOfReady.prototipoUI, [
          "[UX] Desenvolvimento de frontend, necessário protótipo no Figma",
        ])}
        {render(!state.businessDefinitionOfReady.urlPrototipoUI, [
          "[UX] Desenvolvimento de frontend, informar link do protótipo",
        ])}
        {render(!state.businessDefinitionOfReady.taguamentoDefinido, [
          "[UX] Desenvolvimento de frontend, necessário definição de tagueamento e criação de techspecs",
        ])}
        {render(!state.businessDefinitionOfReady.obsTechSpec, [
          "[UX] Desenvolvimento de frontend, informar como acessar as techspecs",
        ])}
        {renderRequired(state.businessDefinitionOfReady.atualizarTreinamento, [
          "[Negócio] Necessário criar tarefa para atualização de conteúdo de treinamentos",
        ])}
        {renderRequired(state.businessDefinitionOfReady.atualizarFaq, [
          "[Negócio] Necessário criar tarefa para atualização de conteúdo para FAQ",
          "[Tech] Necessário criar tarefa para atualização de conteúdo para FAQ",
        ])}
        {renderRequired(
          !state.businessDefinitionOfReady.comunicacaoViaMarketing,
          ["[Negócio] Avaliar necessidade de comunicação via marketing"],
        )}
      </ul>
    </div>
  );
};

export default ResumoBusinessDoR;
