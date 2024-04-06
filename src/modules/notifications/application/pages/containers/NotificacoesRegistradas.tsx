import { useEffect, useState } from "react";

interface IProps {
  messages: Notification[];
  editNotification: (idx: number) => void;
  removeNotification: (idx: number) => void;
}

const NotificacoesRegistradas = ({
  messages,
  editNotification,
  removeNotification,
}: IProps) => {
  const [hasNotification, setHasNotification] = useState(false);

  useEffect(() => {
    setHasNotification(messages && messages.length > 0);
  }, [messages]);

  return (
    <>
      <h2 className="h5 mt-5 mb-3">Notificações registradas</h2>
      <table className="table table-hover table-sm">
        <thead className="table-dark">
          <tr>
            <th>Componente</th>
            <th>Tipo</th>
            <th>Mensagem</th>
            <th colSpan={2}>Vigência</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody className="table-light">
          {hasNotification &&
            (messages as any[]).map((msg, idx) => (
              <tr key={idx}>
                <td>{msg.cp === "modal" ? "Modal" : "Banner"}</td>
                <td>
                  {msg.t === "info"
                    ? "Novidade"
                    : msg.t === "warn"
                    ? "Alerta"
                    : msg.t === "error"
                    ? "Erro"
                    : msg.t === "danger"
                    ? "Erro crítico"
                    : "-"}
                </td>
                <td>{msg.m}</td>
                <td>{`${msg.st ?? "0000-00-00"} ${msg.sth ?? "00:00"}`}</td>
                <td>{`${msg.ed ?? "0000-00-00"} ${msg.edh ?? "00:00"}`}</td>
                <td>
                  <span
                    role="button"
                    onClick={(e) => editNotification(idx)}
                    className="me-2">
                    <i className="bi bi-pencil"></i>
                  </span>
                  <span role="button" onClick={(e) => removeNotification(idx)}>
                    <i className="bi bi-trash"></i>
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
        {!hasNotification && (
          <tfoot className="p-1 pv-2">
            <tr>
              <td colSpan={5}>
                <span className="p-1 pv-2">Sem notificações</span>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </>
  );
};

export default NotificacoesRegistradas;
