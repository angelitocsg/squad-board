export class BusinessDefinitionOfReady {
  titulo: boolean = false;
  descricao: boolean = false;
  criterioAceite: boolean = false;
  prototipoUI: boolean = false; // frontend
  governacaRiscoAprovada: boolean = false;
  taguamentoDefinido: boolean = false; // frontend
  atualizarTreinamento: boolean = false; // necessário criar task para time de negócios
  atualizarFaq: boolean = false; // necessário criar subtask
  comunicacaoViaMarketing: boolean = false; // necessário criar task para time de negócios

  urlPrototipoUI: string = "";
  obsTechSpec: string = "";
}
