import { v4 as uuidv4 } from "uuid";
import { BusinessDefinitionOfReady } from "../../domain/BusinessDefinitionOfReady";
import { TechDefinitionOfReady } from "../../domain/TechDefinitionOfReady";
import { TechDefinitionOfDone } from "../../domain/TechDefinitionOfDone";

export default class StoryModel {
  id: string = "";
  story: string = "";
  title: string = "";

  oque: string = ""; // O que será feito?
  porque: string = ""; // Por que que será feito?
  como: string = ""; // Como será feito?

  businessDefinitionOfReady = new BusinessDefinitionOfReady();
  techDefinitionOfReady = new TechDefinitionOfReady();
  techDefinitionOfDone = new TechDefinitionOfDone();

  constructor() {
    this.id = uuidv4();
  }
}
