import {
  Tab,
  TabContent,
  TabContentGroup,
  TabGroup,
} from "../../../../components/Tab";
import DynamicTable from "../../../core/components/DynamicTable";
import FormCheckBox from "../../../core/components/FormCheckBox";
import FormInput from "../../../core/components/FormInput";
import ConsumidorModel from "../data/ConsumidorModel";
import useForm from "./useForm";
import useFormAcesso from "./useFormAcesso";
import useFormContato from "./useFormContato";

type IProps = {
  data: ConsumidorModel;
  onChange: (data: ConsumidorModel) => void;
};

const ConsumidorForm = ({ data, onChange }: IProps) => {
  const { state, handleChange } = useForm({ data, onChange });
  const useAcesso = useFormAcesso({ data: state, onChange });
  const useContato = useFormContato({ data: state, onChange });

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
          <DynamicTable
            actions={useAcesso.tActions}
            columns={useAcesso.tColumns}
            lines={useAcesso.lines}
            headerButtons={useAcesso.tHeaderButtons}
            onFieldChange={useAcesso.handleChangeLine}
          />
        </TabContent>
        <TabContent tabId="tabContatos">
          <DynamicTable
            actions={useContato.tActions}
            columns={useContato.tColumns}
            lines={useContato.lines}
            headerButtons={useContato.tHeaderButtons}
            onFieldChange={useContato.handleChangeLine}
          />
        </TabContent>
      </TabContentGroup>
    </div>
  );
};

export default ConsumidorForm;
