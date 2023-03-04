import { v4 as uuidv4 } from "uuid";

export interface IFaqCategory {
  id: string;
  categoria: string;
  selecionado: boolean;
  conteudo: IFaqContent[];
}

export interface IFaqContent {
  id: string;
  pergunta: string;
  resposta: string;
  palavras_chave: string[];
}

export const FaqContentDefault = (): IFaqContent => ({
  id: uuidv4(),
  pergunta: "Qual é a pergunta?",
  resposta: "Agora a resposta",
  palavras_chave: ["pergunta", "resposta"],
});
