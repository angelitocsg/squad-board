import FormCheckBox from "../../../core/components/FormCheckBox";
import FormInput from "../../../core/components/FormInput";
import StoryModel from "../data/StoryModel";

interface IProps {
  state: StoryModel;
  handleChangeBusinessDoR: (e: any) => void;
}

const PageBusinessDoR = ({ state, handleChangeBusinessDoR }: IProps) => {
  return (
    <div className="col">
      <h2 className="h5 mb-4">DoR - Visão negócio</h2>
      <FormCheckBox
        className="small mb-2"
        field="titulo"
        label="Título escrito de forma clara"
        value={state.businessDefinitionOfReady.titulo}
        onChange={handleChangeBusinessDoR}
      />
      <FormCheckBox
        className="small mb-2"
        field="descricao"
        label="Descrição bem escrita (visão usuário + regra do negócio)"
        value={state.businessDefinitionOfReady.descricao}
        onChange={handleChangeBusinessDoR}
      />
      <FormCheckBox
        className="small mb-2"
        field="criterioAceite"
        label="Critério de aceite mínimo bem definido"
        value={state.businessDefinitionOfReady.criterioAceite}
        onChange={handleChangeBusinessDoR}
      />
      <FormCheckBox
        className="small mb-2"
        field="prototipoUI"
        label="Protótipo de interface (Figma) validado"
        value={state.businessDefinitionOfReady.prototipoUI}
        onChange={handleChangeBusinessDoR}
      />
      <FormCheckBox
        className="small mb-2"
        field="taguamentoDefinido"
        label="Tagueamento definito e techspecs prontas"
        value={state.businessDefinitionOfReady.taguamentoDefinido}
        onChange={handleChangeBusinessDoR}
      />
      <FormCheckBox
        className="small mb-2"
        field="governacaRiscoAprovada"
        label="Nova governança de risco conceitual aprovado"
        value={state.businessDefinitionOfReady.governacaRiscoAprovada}
        onChange={handleChangeBusinessDoR}
      />
      <FormCheckBox
        className="small mb-2"
        field="atualizarTreinamento"
        label="Necessário atualizar treinamento"
        value={state.businessDefinitionOfReady.atualizarTreinamento}
        onChange={handleChangeBusinessDoR}
      />
      <FormCheckBox
        className="small mb-2"
        field="atualizarFaq"
        label="Necessário atualizar FAQ"
        value={state.businessDefinitionOfReady.atualizarFaq}
        onChange={handleChangeBusinessDoR}
      />
      <FormCheckBox
        className="small mb-2"
        field="comunicacaoViaMarketing"
        label="Planejado comunicação via marketing"
        value={state.businessDefinitionOfReady.comunicacaoViaMarketing}
        onChange={handleChangeBusinessDoR}
      />
      <FormInput
        type="text"
        field="urlPrototipoUI"
        label="Link protótipo de interface (Figma)"
        value={state.businessDefinitionOfReady.urlPrototipoUI}
        onChange={handleChangeBusinessDoR}
      />
      <FormInput
        type="text"
        field="obsTechSpec"
        label="Como acessar as techspecs"
        value={state.businessDefinitionOfReady.obsTechSpec}
        onChange={handleChangeBusinessDoR}
      />
    </div>
  );
};

export default PageBusinessDoR;
