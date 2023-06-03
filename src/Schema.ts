import { Model } from "./Model";

export class Schema {
  constructor(public name: string, public models: Model[] = []) {}
}
