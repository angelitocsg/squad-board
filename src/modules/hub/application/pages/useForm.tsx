import { useEffect, useState } from "react";

import ConsumidorModel from "../data/ConsumidorModel";

type IProps = {
  data: ConsumidorModel;
  onChange: (data: ConsumidorModel) => void;
};

const useForm = ({ data, onChange }: IProps) => {
  const [state, setState] = useState<ConsumidorModel>(data);

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    onChange && onChange(state);
  }, [onChange, state]);

  return {
    state,
    setState,
    handleChange,
  };
};

export default useForm;
