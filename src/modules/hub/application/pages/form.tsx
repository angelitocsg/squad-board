import {
  Tab,
  TabContent,
  TabContentGroup,
  TabGroup,
} from "../../../../components/Tab";
import DisplayTable from "../../../core/components/DisplayTable";
import FormCheckBox from "../../../core/components/FormCheckBox";
import FormInput from "../../../core/components/FormInput";
import ConsumidorModel from "../data/ConsumidorModel";
import useForm from "./useForm";

type IProps = {
  data: ConsumidorModel;
  onChange: (data: ConsumidorModel) => void;
};

const ConsumidorForm = ({ data, onChange }: IProps) => {
  const {
    state,
    acessos,
    contatos,
    tColumnsAcessos,
    tHeaderButtonsAcessos,
    tActionsAcessos,
    tColumnsContatos,
    tHeaderButtonsContatos,
    tActionsContatos,
    handleChange,
  } = useForm({
    data,
    onChange,
  });

  return (
    <div>
      <div className="row">
        <div className="col-3">
          <FormInput
            type="text"
            label="CNPJ"
            field="cnpj"
            value={state.cnpj}
            placeholder="00.000.000/0000-00"
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            type="text"
            label="Data cadastro"
            field="dataCadastro"
            value={state.dataCadastro}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            type="text"
            label="Data DevPortal"
            field="dataAcessoDoc"
            value={state.dataAcessoDoc}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            type="text"
            label="Data AuthHierarquia"
            field="dataAcessoAuthHierarquia"
            value={state.dataAcessoAuthHierarquia}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            type="text"
            label="Data Whitelist"
            field="dataAcessoWhitelist"
            value={state.dataAcessoWhitelist}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-7">
          <FormInput
            type="text"
            label="Razão Social"
            field="razaoSocial"
            value={state.razaoSocial}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            type="text"
            label="Nome fantasia"
            field="nomeFantasia"
            value={state.nomeFantasia}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mb-3 d-flex gap-4">
        <FormCheckBox
          label="Ativo"
          field="ativo"
          value={!!state.ativo}
          onChange={handleChange}
        />
      </div>

      <TabGroup>
        <Tab
          tabId="tabAcessos"
          tabLabel="Acessos"
          tabBadge={acessos.length.toString()}
          active
        />
        <Tab
          tabId="tabContatos"
          tabLabel="Contatos"
          tabBadge={contatos.length.toString()}
        />
        <Tab
          tabId="tabObservacoes"
          tabLabel="Observações"
          tabBadge={state.observacoes ? "+" : ""}
        />
      </TabGroup>
      <TabContentGroup minHeight={320}>
        <TabContent tabId="tabAcessos" active>
          <DisplayTable
            headerButtons={tHeaderButtonsAcessos}
            actions={tActionsAcessos}
            columns={tColumnsAcessos}
            lines={acessos}
          />
        </TabContent>
        <TabContent tabId="tabContatos">
          <DisplayTable
            headerButtons={tHeaderButtonsContatos}
            actions={tActionsContatos}
            columns={tColumnsContatos}
            lines={contatos}
          />
        </TabContent>
        <TabContent tabId="tabObservacoes">
          <FormInput
            type="textarea"
            label=""
            field="observacoes"
            rows={9}
            value={state.observacoes}
            onTextAreaChange={handleChange}
          />
        </TabContent>
      </TabContentGroup>
    </div>
  );
};

export default ConsumidorForm;
