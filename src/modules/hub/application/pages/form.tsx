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
        <div className="col-4">
          <FormInput
            type="text"
            label="CNPJ"
            field="cnpj"
            value={state.cnpj}
            placeholder="00.000.000/0000-00"
            onChange={handleChange}
          />
        </div>
        <div className="col-8">
          <FormInput
            type="text"
            label="Razão Social"
            field="razaoSocial"
            value={state.razaoSocial}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          <FormInput
            type="text"
            label="Nome fantasia"
            field="nomeFantasia"
            value={state.nomeFantasia}
            onChange={handleChange}
          />
        </div>
        <div className="col-4">
          <FormInput
            type="text"
            label="Data cadastro"
            field="dataCadastro"
            value={state.dataCadastro}
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
        <FormCheckBox
          label="Acesso documentação API"
          field="acessoDocto"
          value={!!state.acessoDocto}
          onChange={handleChange}
        />
        <FormCheckBox
          label="Acesso via hierarquia"
          field="acessoViaHierarquia"
          value={!!state.acessoViaHierarquia}
          onChange={handleChange}
        />
      </div>

      <TabGroup>
        <Tab tabId="tabAcessos" tabLabel="Acessos" active />
        <Tab tabId="tabContatos" tabLabel="Contatos" />
      </TabGroup>
      <TabContentGroup>
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
      </TabContentGroup>
    </div>
  );
};

export default ConsumidorForm;
