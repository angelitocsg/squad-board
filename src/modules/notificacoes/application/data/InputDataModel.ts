import NotificacaoModel from "./NotificacaoModel";

const MESSAGES = "messages";

export default class InputDataModel {
  content: { [key: string]: string | undefined };
  messages: NotificacaoModel[];

  constructor(content: string) {
    const jsonData = JSON.parse(content);
    const keys = Object.keys(jsonData);
    this.content = loadValues([...keys], { ...jsonData });
    this.messages = loadMessages([...keys], { ...jsonData });
  }
}

function loadValues(keys: string[], jsonData: any) {
  let c: any = {};
  keys
    .filter((f) => f !== MESSAGES)
    .forEach((k) => {
      c[k] = jsonData[k];
    });
  return c;
}

function loadMessages(keys: string[], jsonData: any) {
  if (keys.indexOf(MESSAGES) >= 0) return jsonData[MESSAGES];
  return [];
}
