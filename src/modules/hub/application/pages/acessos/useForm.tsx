import { useEffect, useState } from "react";
import AcessoModel from "../../data/AcessoModel";
import { useService } from "../../../../../di/DecouplerContext";
import ConsumidorRepository from "../../../repository/ConsumidorRepository";
import { ISelectOptions } from "../../../../core/components/SelectInput";
import ConsumidorModel from "../../data/ConsumidorModel";

type IProps = {
  data: AcessoModel;
  onChange: (data: AcessoModel) => void;
};

const useForm = ({ data, onChange }: IProps) => {
  const [state, setState] = useState<AcessoModel>(data);

  const consumidorRepository = useService<ConsumidorRepository>(
    "ConsumidorRepository",
  );
  const [consumidores, setConsumidores] = useState<ISelectOptions[]>([]);

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    consumidorRepository.getAll();
    var subscriber = consumidorRepository.data$.subscribe((items) => {
      setConsumidores([
        { label: "", value: "" },
        ...items.map((item) => {
          const consumidor = ConsumidorModel.fromDomain(item);
          return {
            label: `${consumidor.nomeFantasia} ${consumidor.cnpj}`,
            value: consumidor.id,
          };
        }),
      ]);
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [consumidorRepository]);

  useEffect(() => {
    onChange && onChange(state);
  }, [onChange, state]);

  const getConsumidorValue = () => {
    const _default = { label: "", value: "" };
    if (consumidores.length === 0) return _default;
    const product = consumidores.find((p) => p.value === state.consumidorId);
    return product ?? _default;
  };

  return {
    state,
    consumidores,
    setState,
    handleChange,
    getConsumidorValue,
  };
};

export default useForm;
