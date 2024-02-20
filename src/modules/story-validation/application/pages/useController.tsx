import { useEffect, useState } from "react";

import { useService } from "../../../../di/DecouplerContext";
import AppModalService from "../../../core/components/AppModal/AppModalService";
import { IHeaderActions } from "../../../core/components/DisplayTable/headerActions";
import StoryModel from "../data/StoryModel";
import Resumo from "./resumo";

const useController = () => {
  const modalService = useService<AppModalService>("AppModalService");
  const [state, setState] = useState<StoryModel>(new StoryModel());

  useEffect(() => {
    document.title = "Validação de histórias | Squad";
  }, []);

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleChangeBusinessDoR = (e: any) =>
    handleChangeDetail("businessDefinitionOfReady", e);
  const handleChangeTechDoR = (e: any) =>
    handleChangeDetail("techDefinitionOfReady", e);

  const handleChangeDetail = (
    parent: "businessDefinitionOfReady" | "techDefinitionOfReady",
    e: any,
  ) => {
    setState({
      ...state,
      [parent]: {
        ...state[parent],
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleNew = () => {
    setState(new StoryModel());
  };

  const handleExport = () => {
    modalService
      .config({
        title: "cole o texto abaixo na descrição da história",
        size: "xlarge",
        buttonOkLabel: "Fechar",
        buttonCancelHidden: true,
        children: () => <Resumo state={state} modal />,
      })
      .open();
  };

  const tHeaderButtons: IHeaderActions = {
    buttonNew: {
      label: "Nova",
      action: handleNew,
    },
    buttonExport: {
      label: "Exportar",
      action: handleExport,
    },
  };

  return {
    state,
    tHeaderButtons,
    handleChange,
    handleChangeBusinessDoR,
    handleChangeTechDoR,
  };
};

export default useController;

const render = (show: boolean, messages: string[]) =>
  show ? (
    <>
      {messages.map((m, i) => (
        <li key={i}>{m}</li>
      ))}
    </>
  ) : null;

const renderRequired = (show: boolean, messages: string[]) =>
  show ? (
    <>
      {messages.map((m, i) => (
        <li className="text-danger" key={i}>
          {m}
        </li>
      ))}
    </>
  ) : null;

const renderText = (show: boolean, messages: string[], link: string = "") =>
  show ? (
    <>
      {messages.map((m, i) => (
        <p
          className="mb-3"
          key={i}
          dangerouslySetInnerHTML={{
            __html:
              link !== ""
                ? m.replaceAll(
                    "{{link}}",
                    `<a href="${link}" target="_blank">${link}</a>`,
                  )
                : m,
          }}></p>
      ))}
    </>
  ) : null;

export { render, renderRequired, renderText };
