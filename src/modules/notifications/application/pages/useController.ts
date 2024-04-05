import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useService } from '../../../../di/DecouplerContext';
import { NotificationModel } from '../data/NotificationModel';
import NotificationStore from '../data/NotificationStore';

const useController = () => {
  const notificationStore = useService<NotificationStore>("NotificationStore");
  const [notification, set_notification] = useState<NotificationModel>(
    notificationStore.current,
  );
  const [messages, set_messages] = useState<Notification[]>([]);
  const [is_modal, set_is_modal] = useState<boolean>(false);
  const [valid_data, set_valid_data] = useState<any>({});

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
    set_notification({
      ...notificationStore.current,
      id: uuidv4().split("-")[0],
    });
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
    const is = notification.cp === "modal";
    if (!is) {
      set_notification({
        ...notification,
        tit: undefined,
        txb: undefined,
        chk: undefined,
        m: ""
      });
    }
    set_is_modal(is);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification.cp]);

  useEffect(() => {
    document.title = "Notificações | Squad";
  }, []);

  return {
    messages,
    notification,
    valid_data,
    is_modal,
    editNotification,
    set_notification,
    saveNotification,
    set_valid_data,
    updateValue,
    updateInputValue,
    updateSelectMultiple,
    removeNotification,
  };
};

export default useController;
