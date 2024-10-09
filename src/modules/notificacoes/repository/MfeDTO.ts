import { v4 as uuidv4 } from "uuid";

export default class MfeDTO {
  id!: string;
  label!: string;
  value!: string;

  constructor(
    id: string | null = null,
    label: string = "",
    value: string = "",
  ) {
    this.id = id ?? uuidv4().split("-")[0];
    this.label = label;
    this.value = value;
  }
}
