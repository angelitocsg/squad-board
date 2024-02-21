import { useEffect, useState } from "react";

import { useService } from "../../../../di/DecouplerContext";
import ExportHelper from "../../../../helpers/export.helper";
import AppModalService from "../../../core/components/AppModal/AppModalService";
import { IHeaderActions } from "../../../core/components/DisplayTable/headerActions";
import StoryModel from "../data/StoryModel";
import ImportStoryForm from "./importStoryForm";

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
  const handleChangeTechDoD = (e: any) =>
    handleChangeDetail("techDefinitionOfDone", e);

  const handleChangeDetail = (
    parent:
      | "businessDefinitionOfReady"
      | "techDefinitionOfReady"
      | "techDefinitionOfDone",
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

  const [importStory, setImportStory] = useState("");

  useEffect(() => {
    try {
      const jsonData = JSON.parse(importStory);
      setState({
        ...new StoryModel(),
        ...jsonData,
      });
    } catch {
      setState(new StoryModel());
    }
  }, [importStory]);

  const handleImport = () => {
    modalService
      .config({
        title: "cole o conteúdo do json aqui",
        size: "large",
        buttonOkLabel: "Fechar",
        buttonCancelHidden: true,
        children: () => <ImportStoryForm update={setImportStory} />,
      })
      .open();
  };

  const handleExport = () => {
    if (!state.story) return;
    ExportHelper.jsonFile(state, `${state.story}-validacao`);
  };

  const tHeaderButtons: IHeaderActions = {
    buttonNew: {
      label: "Nova",
      action: handleNew,
    },
    buttonImport: {
      label: "Importar",
      action: handleImport,
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
    handleChangeTechDoD,
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
