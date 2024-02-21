import FormCheckBox from "../../../core/components/FormCheckBox";
import StoryModel from "../data/StoryModel";

interface IProps {
  state: StoryModel;
  handleChangeTechDoD: (e: any) => void;
}

const PageTechDoD = ({ state, handleChangeTechDoD }: IProps) => {
  return (
    <>
      <h2 className="h5 mb-4">DoD - Visão tecnologia</h2>
      <div className="row">
        <div className="col">
          <FormCheckBox
            className="small mb-2"
            field="criterioDeAceite"
            label="Todos os critérios de aceite da história foram desenvolvidos e testados unitariamente"
            value={state.techDefinitionOfDone.criterioDeAceite}
            onChange={handleChangeTechDoD}
          />
          <FormCheckBox
            className="small mb-2"
            field="codeReview"
            label="Code review feito por outro membro da equipe"
            value={state.techDefinitionOfDone.codeReview}
            onChange={handleChangeTechDoD}
          />
          <FormCheckBox
            className="small mb-2"
            field="envVarDevHomProd"
            label="Variáveis de ambiente validadas no ambientes de DEV, HOM e PROD"
            value={state.techDefinitionOfDone.envVarDevHomProd}
            onChange={handleChangeTechDoD}
          />
          <FormCheckBox
            className="small mb-2"
            field="logsRastreabilidade"
            label="Logs implementados seguindo a rastreabilidade do que foi desenvolvido"
            value={state.techDefinitionOfDone.logsRastreabilidade}
            onChange={handleChangeTechDoD}
          />
          <FormCheckBox
            className="small mb-2"
            field="logsSemDadosSensiveis"
            label="Logs implementados sem dados sensíveis"
            value={state.techDefinitionOfDone.logsSemDadosSensiveis}
            onChange={handleChangeTechDoD}
          />
          <FormCheckBox
            className="small mb-2"
            field="testesUnitarios90p"
            label="Testes unitários com cobertura de, no mínimo, 90%."
            value={state.techDefinitionOfDone.testesUnitarios90p}
            onChange={handleChangeTechDoD}
          />
          <FormCheckBox
            className="small mb-2"
            field="tagueamentoMinimoGoogleAnalytics"
            label="Tagueamento mínimo da página (Google Analytics)"
            value={state.techDefinitionOfDone.tagueamentoMinimoGoogleAnalytics}
            onChange={handleChangeTechDoD}
          />
          <FormCheckBox
            className="small mb-2"
            field="testesFuncionaisComEvidencias"
            label="Testes funcionais realizados e evidenciados na história"
            value={state.techDefinitionOfDone.testesFuncionaisComEvidencias}
            onChange={handleChangeTechDoD}
          />
          <FormCheckBox
            className="small mb-2"
            field="testesTaac"
            label="Testes do TAAC criados (Cypress, cucumber, Xunit etc)"
            value={state.techDefinitionOfDone.testesTaac}
            onChange={handleChangeTechDoD}
          />
          <FormCheckBox
            className="small mb-2"
            field="testesPerformance"
            label="Testes de performance realizados e evidenciados na história"
            value={state.techDefinitionOfDone.testesPerformance}
            onChange={handleChangeTechDoD}
          />
          <FormCheckBox
            className="small mb-2"
            field="testesAcessibilidade"
            label="Testes de acessibilidade com Cypress-axe realizados e evidenciados na história"
            value={state.techDefinitionOfDone.testesAcessibilidade}
            onChange={handleChangeTechDoD}
          />
          <FormCheckBox
            className="small mb-2"
            field="testesVulnerabilidade"
            label="Testes de vulnerabilidades realizados e evidenciados na história"
            value={state.techDefinitionOfDone.testesVulnerabilidade}
            onChange={handleChangeTechDoD}
          />
        </div>
        <div className="col">
          <FormCheckBox
            className="small mb-2"
            field="sandboxParaApi"
            label="Sandbox criado/atualizado com as informações do dummy data"
            value={state.techDefinitionOfDone.sandboxParaApi}
            onChange={handleChangeTechDoD}
          />
          <FormCheckBox
            className="small mb-2"
            field="gatewayAtualizado"
            label="Contratos do gateway atualizados nos ambientes"
            value={state.techDefinitionOfDone.gatewayAtualizado}
            onChange={handleChangeTechDoD}
          />
          <FormCheckBox
            className="small mb-2"
            field="releaseNotesApp"
            label="Mudanças registradas no Release Notes"
            value={state.techDefinitionOfDone.releaseNotesApp}
            onChange={handleChangeTechDoD}
          />
          <FormCheckBox
            className="small mb-2"
            field="deployRealizado"
            label="Deploy em produção concluído"
            value={state.techDefinitionOfDone.deployRealizado}
            onChange={handleChangeTechDoD}
          />
          <FormCheckBox
            className="small mb-2"
            field="debitosTecnicosDocumentados"
            label="Débitos técnicos cadastradas em backlog"
            value={state.techDefinitionOfDone.debitosTecnicosDocumentados}
            onChange={handleChangeTechDoD}
          />
          <FormCheckBox
            className="small mb-2"
            field="treinamentoFaqAtualizados"
            label="Treinamento e FAQ atualizados"
            value={state.techDefinitionOfDone.treinamentoFaqAtualizados}
            onChange={handleChangeTechDoD}
          />
          <FormCheckBox
            className="small mb-2"
            field="comunicadoViaMarketing"
            label="Comunicados via marketing enviados"
            value={state.techDefinitionOfDone.comunicadoViaMarketing}
            onChange={handleChangeTechDoD}
          />
          <FormCheckBox
            className="small mb-2"
            field="revisarSonarQube"
            label="Notificações do SonarQube revisadas"
            value={state.techDefinitionOfDone.revisarSonarQube}
            onChange={handleChangeTechDoD}
          />
          <FormCheckBox
            className="small mb-2"
            field="revisarSast"
            label="Notificações das ferramentas de SAST revisadas"
            value={state.techDefinitionOfDone.revisarSast}
            onChange={handleChangeTechDoD}
          />
          <FormCheckBox
            className="small mb-2"
            field="featureToggleImplementado"
            label="Feature Toggle implementado"
            value={state.techDefinitionOfDone.featureToggleImplementado}
            onChange={handleChangeTechDoD}
          />
        </div>
      </div>
    </>
  );
};

export default PageTechDoD;
