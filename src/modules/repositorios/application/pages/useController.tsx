import { useEffect } from "react";

import useTableRepository from "./useTableRepository";

const useController = () => {
  const { tActions, tHeaderButtons, tColumns, lines, loadRepositories, handleEdit } =
    useTableRepository();

  useEffect(() => {
    loadRepositories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.title = "Repositórios | Squad";
  }, []);

  return { tActions, tColumns, tHeaderButtons, lines, handleEdit };
};

export default useController;
