import { Field, NameConflictError } from "../index";
import { Model } from "./Model";

export class Schema {
  constructor(public name: string, public models: Model[] = []) {}

  addModel(name: string): Model {
    const _exists: Model | undefined = this.models.find((m) => m.name === name);
    if (_exists) {
      throw new NameConflictError(name, "model");
    }
    const newModel = new Model(name, this);
    this.models.push(newModel);
    return newModel;
  }
}
