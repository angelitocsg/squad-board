import { v4 as uuidv4 } from "uuid";

import { IFaqCategory } from "../models/IFaqCategory";
import { IImportService } from "../interfaces/IImportService";

export class FaqService implements IImportService {
  clear() {
    localStorage.removeItem("faq_data");
  }

  import(data: string) {
    let faqData = JSON.parse(data) as IFaqCategory[];
    faqData = faqData.map((faq) => ({
      ...faq,
      id: faq.id?.toString().length > 5 ? faq.id : uuidv4(),
      conteudo: faq.conteudo.map((cont) => ({
        ...cont,
        id: cont.id ? cont.id : uuidv4(),
      })),
    }));
    localStorage.setItem("faq_data", JSON.stringify(faqData));
  }
}
