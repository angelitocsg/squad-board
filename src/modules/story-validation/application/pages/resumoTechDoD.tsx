import { useEffect, useState } from "react";

import StoryModel from "../data/StoryModel";
import { render, renderRequired } from "./useController";

interface IProps {
  state: StoryModel;
}

const ResumoTechDoD = ({ state }: IProps) => {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    setHidden(
      !document.getElementById("lista-resumo-tech-dod")?.childElementCount,
    );
  }, [state.techDefinitionOfDone]);

  return (
    <div className="mb-3">
      <h3 className={`h6 ${hidden && "d-none"}`}>DoD - Geral</h3>
      <ul id="lista-resumo-tech-dod" className="small m-0">
        {renderRequired(!state.techDefinitionOfDone.criterioDeAceite, [
          "[Desenvolvedor] Revisar critérios de aceite",
        ])}
        {renderRequired(!state.techDefinitionOfDone.codeReview, [
          "[Desenvolvedor] Outro desenvolvedor deve fazer o code review antes de enviar códigos para DEV e HOM",
        ])}
        {renderRequired(!state.techDefinitionOfDone.envVarDevHomProd, [
          "[Desenvolvedor] As variáveis devem ser validadas em todos os ambientes, se possível, antes do deploy em produção",
        ])}
        {renderRequired(!state.techDefinitionOfDone.logsRastreabilidade, [
          "[Desenvolvedor] Revisar implementação de logs para permitir rastreabilidade das operações",
        ])}
        {renderRequired(!state.techDefinitionOfDone.logsSemDadosSensiveis, [
          "[Desenvolvedor] Revisar dados sensíveis que estejam sendo registrados em log",
        ])}
        {renderRequired(!state.techDefinitionOfDone.testesUnitarios90p, [
          "[Desenvolvedor] Garantir cobertura de testes de no mínimo 90% e Sonarqube gate em 80%",
        ])}
        {render(!state.techDefinitionOfDone.tagueamentoMinimoGoogleAnalytics, [
          "[Desenvolvedor] Desenvolvimento frontend, necessário tagueamento mínimo no GA",
        ])}
        {render(!state.techDefinitionOfDone.testesFuncionaisComEvidencias, [
          "[Desenvolvedor] Registre as evidências na história após realização dos testes funcionais",
        ])}
        {renderRequired(!state.techDefinitionOfDone.testesTaac, [
          "[Desenvolvedor] Garanta que as configurações do TaaC está corretas e testes automatizados sendo executados",
        ])}
        {render(!state.techDefinitionOfDone.testesPerformance, [
          "[Desenvolvedor] Desenvolvimento backend, realize os testes de performance conforme necessidade",
        ])}
        {renderRequired(!state.techDefinitionOfDone.testesAcessibilidade, [
          "[Desenvolvedor] Desenvolvimento frontend, todas as novas funcionalidades devem receber o parecer de acessibilidade",
        ])}
        {render(!state.techDefinitionOfDone.testesVulnerabilidade, [
          "[Desenvolvedor] Todas as novas funcionalidades devem receber o parecer de vulnerabilidade",
        ])}
        {render(!state.techDefinitionOfDone.sandboxParaApi, [
          "[Desenvolvedor] Desenvolvimento backend, gateways devem ter o sandbox dos enpoints configurados e testados",
        ])}
        {renderRequired(!state.techDefinitionOfDone.gatewayAtualizado, [
          "[Desenvolvedor] Garanta que o gateway foi atualizado tanto nos mocks do cypress quanto na infra da BFF",
        ])}
        {render(!state.techDefinitionOfDone.releaseNotesApp, [
          "[Desenvolvedor] Quando aplicável atualize o RELEASE NOTES da aplicação",
        ])}
        {renderRequired(!state.techDefinitionOfDone.deployRealizado, [
          "[Desenvolvedor] A história só pode ser considerada concluída após a publicação e validação em produção",
        ])}
        {render(!state.techDefinitionOfDone.debitosTecnicosDocumentados, [
          "[Desenvolvedor] Quado aplicável documentar possíveis débitos técnicos durante o desenvolvimento",
        ])}
        {renderRequired(!state.techDefinitionOfDone.treinamentoFaqAtualizados, [
          "[Desenvolvedor] Garanta que os treinamentos e FAQ estejam atualizados logo após a publicação em produção",
        ])}
        {renderRequired(!state.techDefinitionOfDone.comunicadoViaMarketing, [
          "[Desenvolvedor] Garanta que as comunicações via marketing tenho sido programadas e/ou enviadas",
        ])}
        {render(!state.techDefinitionOfDone.revisarSonarQube, [
          "[Desenvolvedor] Antes de considerar a história concluída revise as notificações do SonarQube",
        ])}
        {render(!state.techDefinitionOfDone.revisarSast, [
          "[Desenvolvedor] Antes de considerar a história concluída revise as notificações das ferramentas de SAST",
        ])}
        {render(!state.techDefinitionOfDone.featureToggleImplementado, [
          "[Desenvolvedor] O feature toggle deve ser considerado em novos desenvolvimentos para evitar impedimentos de deploy",
        ])}
      </ul>
    </div>
  );
};

export default ResumoTechDoD;
