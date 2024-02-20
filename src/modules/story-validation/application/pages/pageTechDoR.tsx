import FormCheckBox from "../../../core/components/FormCheckBox";
import StoryModel from "../data/StoryModel";

interface IProps {
  state: StoryModel;
  handleChangeTechDoR: (e: any) => void;
}

const PageTechDoR = ({ state, handleChangeTechDoR }: IProps) => {
  return (
    <div className="col">
      <h2 className="h5 mb-4">DoR - Visão tecnologia</h2>
      <FormCheckBox
        className="small mb-2"
        field="contagemBcp"
        label="Estimativas e contagem de BCPs"
        value={state.techDefinitionOfReady.contagemBcp}
        onChange={handleChangeTechDoR}
      />
      <FormCheckBox
        className="small mb-2"
        field="refinamento"
        label="Refinamento técnico realizado"
        value={state.techDefinitionOfReady.refinamento}
        onChange={handleChangeTechDoR}
      />
      <FormCheckBox
        className="small mb-2"
        field="contratoApi"
        label="Contratos de API criados"
        value={state.techDefinitionOfReady.contratoApi}
        onChange={handleChangeTechDoR}
      />
      <FormCheckBox
        className="small mb-2"
        field="massaDeTesteEMock"
        label="Massa de teste e mock criado para frontend e backend"
        value={state.techDefinitionOfReady.massaDeTesteEMock}
        onChange={handleChangeTechDoR}
      />
      <FormCheckBox
        className="small mb-2"
        field="escopoRequisitos"
        label="Definido escopo da história e requisitos"
        value={state.techDefinitionOfReady.escopoRequisitos}
        onChange={handleChangeTechDoR}
      />
      <FormCheckBox
        className="small mb-2"
        field="iteracaoDependencias"
        label="Mapeado as iterações e dependências do backend"
        value={state.techDefinitionOfReady.iteracaoDependencias}
        onChange={handleChangeTechDoR}
      />
      <FormCheckBox
        className="small mb-2"
        field="ambienteProvisionado"
        label="Ambientes provisionados (infra, defectDojo) (histórias enablers)"
        value={state.techDefinitionOfReady.ambienteProvisionado}
        onChange={handleChangeTechDoR}
      />
      <FormCheckBox
        className="small mb-2"
        field="desenhoSolucaoTecnica"
        label="Definido desenho solução técnica (macro)"
        value={state.techDefinitionOfReady.desenhoSolucaoTecnica}
        onChange={handleChangeTechDoR}
      />
      <FormCheckBox
        className="small mb-2"
        field="modelagemNegocio"
        label="Modelagem de negócio sobre o fluxo e regras"
        value={state.techDefinitionOfReady.modelagemNegocio}
        onChange={handleChangeTechDoR}
      />
      <FormCheckBox
        className="small mb-2"
        field="featureToggle"
        label="Implementação de Feature Toggle"
        value={state.techDefinitionOfReady.featureToggle}
        onChange={handleChangeTechDoR}
      />
    </div>
  );
};

export default PageTechDoR;
