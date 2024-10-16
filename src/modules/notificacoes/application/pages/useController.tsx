import { useEffect, useState } from "react";

import { useService } from "../../../../di/DecouplerContext";
import AlertModalService from "../../../core/components/AlertModal/AlertModalService";
import AppModalService from "../../../core/components/AppModal/AppModalService";
import { IActions, IColumns } from "../../../core/components/DisplayTable";
import { IHeaderActions } from "../../../core/components/DisplayTable/headerActions";
import Notificacao from "../../domain/Notificacao";
import NotificacaoRepository from "../../repository/NotificacaoRepository";
import InputDataStore from "../data/InputDataStore";
import NotificacaoModel from "../data/NotificacaoModel";
import NotificacaoStore from "../data/NotificacaoStore";
import NotificacaoForm from "./form";
import { vv_fx } from "../data/SelectOptions";

const useController = () => {
  const modalService = useService<AppModalService>("AppModalService");
  const alertService = useService<AlertModalService>("AlertModalService");
  const inputDataStore = useService<InputDataStore>("InputDataStore");
  const notificacaoStore = useService<NotificacaoStore>("NotificacaoStore");
  const notificacaoRepository = useService<NotificacaoRepository>(
    "NotificacaoRepository",
  );
  const [lines, setLines] = useState<NotificacaoModel[]>([]);

  const tColumns: IColumns[] = [
    { field: "id", title: "ID" },
    { field: "componente", title: "Componente (Tipo)" },
    { field: "mensagem", title: "Mensagem" },
    { field: "mfes", title: "Microfrontends" },
    { field: "vigencia", title: "Vigência" },
  ];

  useEffect(() => {
    document.title = "Notificações | Squad";
  }, []);

  useEffect(() => {
    notificacaoRepository.getAll();
    var subscriber = notificacaoRepository.data$.subscribe((items) => {
      setLines(
        items.map((item) => {
          return {
            ...NotificacaoModel.fromDomain(item),
            mensagem: [
              <div className="text-muted">{item.tit ?? ""}</div>,
              <div>
                {item.m.length > 50 ? item.m.substring(0, 50) + "..." : item.m}
              </div>,
            ],
            componente: [
              <div>
                {`${item.cp === "modal" ? "Modal" : "Banner"} (${
                  item.t === "info"
                    ? "Novidade"
                    : item.t === "warn"
                    ? "Alerta"
                    : item.t === "error"
                    ? "Erro"
                    : item.t === "danger"
                    ? "Erro crítico"
                    : item.t === "money"
                    ? "Financeiro"
                    : item.t === "no_image"
                    ? "Texto (sem imagem)"
                    : "-"
                })`}
              </div>,
              <div className="text-muted">
                {vv_fx.find((x) => x.value.toString() === item.fx.toString())?.label}
              </div>,
            ],
            vigencia: [
              <div>
                {item.st ?? "0000-00-00"} {item.sth ?? "00:00"}
              </div>,
              <div>
                {item.ed ?? "0000-00-00"} {item.edh ?? "00:00"}
              </div>,
            ],
            mfes: item.mf.map((x) => <div>{x}</div>),
          };
        }),
      );
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [notificacaoRepository]);

  const handleSave = () => {
    try {
      const model = notificacaoStore.current;
      const entity = Notificacao.create(
        model.cp,
        model.t,
        model.m,
        model.mf,
        model.fx,
        model.pg,
        model.op,
        model.lk,
        model.rcm,
        model.st,
        model.sth,
        model.ed,
        model.edh,
        model.tit,
        model.txb,
        model.chk,
      );
      if (!model.id) notificacaoRepository.create(entity);
      else notificacaoRepository.update(model.id, entity.updateId(model.id));
      modalService.close();
      inputDataStore.updateCurrent({
        ...inputDataStore.current,
        content: {
          ...inputDataStore.current.content,
        },
        messages: notificacaoRepository
          .getAll()
          .map((x) => NotificacaoModel.fromDomain(x)),
      });
    } catch (e: any) {
      showMessage("error", e.message);
    }
  };

  const showMessage = (type: "error" | "info", message: string) => {
    alertService
      .config({
        type: type,
        title: "Erro",
        buttonOkLabel: "Ok",
        buttonCancelHidden: true,
        children: () => <span>{message}</span>,
      })
      .open();
  };

  const handleNew = () => {
    const model = new NotificacaoModel();
    modalService
      .config({
        title: "nova notificação",
        size: "xlarge",
        buttonOkLabel: "Criar",
        buttonOkAction: handleSave,
        children: () => (
          <NotificacaoForm
            data={model}
            onChange={(state) => {
              notificacaoStore.updateCurrent(state);
            }}
          />
        ),
      })
      .open();
  };

  const handleEdit = (line: NotificacaoModel) => {
    const model = lines.find((x) => x.id === line.id);
    if (!model) return;
    modalService
      .config({
        title: `editar notificação (${line.id.split("-")[0]})`,
        size: "xlarge",
        buttonOkLabel: "Salvar",
        buttonOkAction: handleSave,
        children: () => (
          <NotificacaoForm
            data={model}
            onChange={(state) => {
              notificacaoStore.updateCurrent(state);
            }}
          />
        ),
      })
      .open();
  };

  const handleDelete = (line: NotificacaoModel) => {
    if (window.confirm("Excluir notificação?"))
      notificacaoRepository.delete(line.id);
  };

  const tActions: IActions[] = [
    {
      label: "excluir",
      onClick: handleDelete,
    },
  ];

  const tHeaderButtons: IHeaderActions = {
    buttonNew: {
      label: "Nova",
      action: handleNew,
    },
  };

  useEffect(() => {
    document.title = "Notificações | Squad";
  }, []);

  return {
    tActions,
    tColumns,
    tHeaderButtons,
    lines,
    handleEdit,
  };
};

export default useController;
