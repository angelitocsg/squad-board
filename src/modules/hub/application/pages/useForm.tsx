import { useEffect, useState } from "react";

import { useService } from "../../../../di/DecouplerContext";
import { IColumns } from "../../../core/components/DisplayTable";
import AcessoRepository from "../../repository/AcessoRepository";
import ContatoRepository from "../../repository/ContatoRepository";
import AcessoModel from "../data/AcessoModel";
import ConsumidorModel from "../data/ConsumidorModel";
import ContatoModel from "../data/ContatoModel";

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

  const tColumnsAcessos: IColumns[] = [
    { field: "apiKey", title: "API Key" },
    { field: "sigla", title: "Sigla" },
    { field: "escopos", title: "Escopos" },
    { field: "dataCadastro", title: "Data cadastro" },
    { field: "ativoSimNao", title: "Ativo" },
  ];

  const tColumnsContatos: IColumns[] = [
    { field: "nome", title: "Nome" },
    { field: "telefone", title: "Telefone" },
    { field: "email", title: "Email" },
  ];

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
    tColumnsContatos,
  };
};

export default useForm;
