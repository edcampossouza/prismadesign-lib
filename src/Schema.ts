import { Field, NameConflictError } from "../index";
import { Model } from "./Model";

type SerializedSchema = {
  name: string;
  models: {
    name: string;
    fields: {
      name: string;
      type: string;
      attributes: { name: string }[];
      references?: { model: string; field: string };
      default?: string;
    }[];
  }[];
};

class Schema {
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

  toSerial(): SerializedSchema {
    return {
      name: this.name,
      models: this.models.map((m) => m.toSerial()),
    };
  }
}

export { Schema, SerializedSchema };
