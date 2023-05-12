import { useEffect, useState } from "react";

import ExportHelper from "../../helpers/export.helper";
import { IFaqCategory, IFaqContent } from "../../models/IFaqCategory";
import { FaqService } from "../../services/FaqService";
import { useService } from "../../di/DecouplerContext";

const useFaqEditor = () => {
  const service = useService<FaqService>("FaqService");

  const [faq_data, set_faq_data] = useState<IFaqCategory[]>([]);
  const [mfe_assets, set_mfe_assets] = useState("");
  const [current_category, set_current_category] = useState<IFaqCategory>();
  const [current_content, set_current_content] = useState<IFaqContent>();

  const handleLoadFile = (data: string) => {
    service.import(data);
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  const handleDownloadFile = () => {
    ExportHelper.jsonFile(faq_data, "faq");
  };

  const getFaqData = () => {
    return faq_data;
  };

  const updateCategoryValue = (
    categoryId: string,
    field: string,
    value: any
  ) => {
    set_faq_data(
      faq_data.map((categ) =>
        categ.id === categoryId ? { ...categ, [field]: value } : categ
      )
    );
  };

  const updateContentValue = (
    categoryId: string,
    contentId: string,
    field: string,
    value: any
  ) => {
    const item = faq_data.find((categ) => categ.id === categoryId);
    const content = item?.conteudo.map((content) =>
      content.id === contentId
        ? {
            ...content,
            [field]: value,
          }
        : content
    );

    if (content) {
      updateCategoryValue(categoryId, "conteudo", content);
    }
  };

  const getPergunta = (categoryId: string, contentId: string) =>
    faq_data
      .find((faq) => faq.id === categoryId)
      ?.conteudo.find((cont) => cont.id === contentId);

  const removeContent = (categoryId: string, contentId: string) => {
    var item = getPergunta(categoryId, contentId);
    if (!window.confirm(`Excluir pergunta '${item?.pergunta}'`)) return;
    set_faq_data(
      faq_data.map((categ) =>
        categ.id === categoryId
          ? {
              ...categ,
              conteudo: categ.conteudo.filter((cont) => cont.id !== contentId),
            }
          : categ
      )
    );
    set_current_category(undefined);
    set_current_content(undefined);
  };

  const editContent = (categoryId: string, contentId: string) => {
    set_current_category(faq_data.find((f) => f.id === categoryId));

    set_current_content(
      faq_data
        .find((f) => f.id === categoryId)
        ?.conteudo.find((f) => f.id === contentId)
    );
  };

  const loadData = () => {
    let ls = localStorage.getItem("faq_data") ?? "[]";
    if (ls) set_faq_data(JSON.parse(ls) as IFaqCategory[]);
  };

  const handleClear = () => {
    service.clear();
  };

  useEffect(() => {
    document.title = "FAQ | Squad";
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (faq_data && faq_data.length > 0)
      localStorage.setItem("faq_data", JSON.stringify(faq_data));
  }, [faq_data]);

  const handleAssetsChange = (e: any) => {
    set_mfe_assets(e.target.value);
  };

  return {
    current_content,
    current_category,
    mfe_assets,
    handleAssetsChange,
    getFaqData,
    editContent,
    removeContent,
    handleLoadFile,
    handleDownloadFile,
    updateContentValue,
    handleClear,
  };
};

export default useFaqEditor;
