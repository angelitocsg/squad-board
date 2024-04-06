import { useEffect, useState } from "react";

import { useService } from "../../../../di/DecouplerContext";
import { IActions, IColumns } from "../../../core/components/DisplayTable";
import { IHeaderActions } from "../../../core/components/DisplayTable/headerActions";
import AcessoRepository from "../../repository/AcessoRepository";
import ContatoRepository from "../../repository/ContatoRepository";
import AcessoModel from "../data/AcessoModel";
import AcessoStore from "../data/AcessoStore";
import ConsumidorModel from "../data/ConsumidorModel";
import ConsumidorStore from "../data/ConsumidorStore";
import ContatoModel from "../data/ContatoModel";
import ContatoStore from "../data/ContatoStore";

type IProps = {
  data: ConsumidorModel;
  onChange: (data: ConsumidorModel) => void;
};

const useForm = ({ data, onChange }: IProps) => {
  const [state, setState] = useState<ConsumidorModel>(data);
  const acessoRepository = useService<AcessoRepository>("AcessoRepository");
  const contatoRepository = useService<ContatoRepository>("ContatoRepository");
  const [acessos, setAcessos] = useState<AcessoModel[]>([]);
  const [contatos, setContatos] = useState<ContatoModel[]>([]);
  const acessoStore = useService<AcessoStore>("AcessoStore");
  const contatoStore = useService<ContatoStore>("ContatoStore");
  const consumidorStore = useService<ConsumidorStore>("ConsumidorStore");

  const reopenParent = () => {
    consumidorStore.handleEdit(state);
  };

  // >> ------------ ACESSOS ------------ //

  const handleNewAcesso = () => {
    const model = AcessoModel.create(state.id);
    acessoStore.handleEdit(model, reopenParent);
  };

  const tColumnsAcessos: IColumns[] = [
    { field: "apiKey", title: "API Key" },
    { field: "sigla", title: "Sigla" },
    { field: "escopos", title: "Escopos" },
    { field: "dataCadastro", title: "Data cadastro" },
    { field: "ativoSimNao", title: "Ativo" },
  ];

  const tHeaderButtonsAcessos: IHeaderActions = {
    buttonNew: {
      label: "Novo",
      action: handleNewAcesso,
    },
  };

  const tActionsAcessos: IActions[] = [
    {
      label: "excluir",
      onClick: (model: AcessoModel) =>
        acessoStore.handleDelete(model, reopenParent),
    },
  ];
  // << ------------ ACESSOS ------------ //

  // >> ------------ CONTATOS ------------ //

  const handleNewContato = () => {
    const model = ContatoModel.create(state.id);
    contatoStore.handleEdit(model, reopenParent);
  };

  const tColumnsContatos: IColumns[] = [
    { field: "nome", title: "Nome" },
    { field: "telefone", title: "Telefone" },
    { field: "email", title: "Email" },
  ];

  const tHeaderButtonsContatos: IHeaderActions = {
    buttonNew: {
      label: "Novo",
      action: handleNewContato,
    },
  };

  const tActionsContatos: IActions[] = [
    {
      label: "excluir",
      onClick: (model: ContatoModel) =>
        contatoStore.handleDelete(model, reopenParent),
    },
  ];

  // << ------------ CONTATOS ------------ //

  useEffect(() => {
    contatoRepository.getAll();
    const subscriber = contatoRepository.data$.subscribe((items) => {
      setContatos(
        items
          .filter((x) => x.consumidorId === data.id)
          .map((item) => ContatoModel.fromDomain(item)),
      );
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [contatoRepository, data.id]);

  useEffect(() => {
    acessoRepository.getAll();
    const subscriber = acessoRepository.data$.subscribe((items) => {
      setAcessos(
        items
          .filter((x) => x.consumidorId === data.id)
          .map((item) => ({
            ...AcessoModel.fromDomain(item),
            ativoSimNao: !!item.ativo ? "SIM" : "NÃO",
          })),
      );
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [acessoRepository, data.id]);

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    onChange && onChange(state);
  }, [onChange, state]);

  return {
    state,
    acessos,
    contatos,
    setState,
    handleChange,
    tColumnsAcessos,
    tHeaderButtonsAcessos,
    tActionsAcessos,
    tColumnsContatos,
    tHeaderButtonsContatos,
    tActionsContatos,
  };
};

export default useForm;
