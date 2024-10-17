import { v4 as uuidv4 } from "uuid";

export default class KeyValueDTO {
  id!: string;
  key!: string;
  value!: string;

  constructor(id: string | null = null, key: string = "", value: string = "") {
    this.id = id ?? uuidv4().split("-")[0];
    this.key = key;
    this.value = value;
  }
}
