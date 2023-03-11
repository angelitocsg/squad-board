import { useEffect, useState } from "react";

interface Notification {
  v: number;
  t: "error" | "warn" | "danger" | "info";
  m: string;
  mf: string[];
  pg?: string[];
  op?: string;
  lk?: string;
  rcm?: number;
  st?: string;
  sth?: string;
  ed?: string;
  edh?: string;
  fx: 0 | 1;
}

const notificationInitial: Notification = {
  v: 1,
  t: "info",
  fx: 0,
  m: "",
  mf: [],
};

const useNotifications = () => {
  const [input_data, set_input_data] = useState("{}");
  const [valid_data, set_valid_data] = useState<any>({});
  const [notification, set_notification] =
    useState<Notification>(notificationInitial);
  const [messages, set_messages] = useState<Notification[]>([]);

  const updateValue = (field: string, value: any) => {
    set_notification({
      ...notification,
      [field]: value,
    });
  };

  const updateInputValue = (field: string, value: any) => {
    set_valid_data({
      ...valid_data,
      [field]: value,
    });
  };

  const updateSelectMultiple = (field: string, options: any) => {
    const items = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        items.push(options[i].value);
      }
    }
    updateValue(field, items);
  };

  const saveNotification = (e: any) => {
    e.preventDefault();
    valid_data.messages.push(notification);
    set_valid_data({
      ...valid_data,
      messages: valid_data.messages,
    });
    set_notification(notificationInitial);
  };

  const removeNotification = (idx: number) => {
    valid_data.messages.splice(idx, 1);
    set_valid_data({
      ...valid_data,
      messages: valid_data.messages,
    });
  };

  const editNotification = (idx: number) => {
    set_notification(valid_data.messages[idx]);
    removeNotification(idx);
  };

  useEffect(() => {
    const msgs = JSON.parse(JSON.stringify(valid_data?.messages ?? []));
    set_messages(msgs);
  }, [valid_data]);

  useEffect(() => {
    try {
      const jsonData = JSON.parse(input_data);
      set_valid_data({ messages: [], ...jsonData });
    } catch {}
  }, [input_data]);

  useEffect(() => {
    document.title = "Notificações | Squad";
  }, []);

  return {
    messages,
    notification,
    valid_data,
    input_data,
    editNotification,
    set_notification,
    saveNotification,
    set_input_data,
    updateValue,
    updateInputValue,
    updateSelectMultiple,
    removeNotification,
  };
};

export default useNotifications;
