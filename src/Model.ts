import { DataType } from "./DataType";
import { Field } from "./Field";
import { Schema } from "./Schema";
import { InvalidNameError, NameConflictError } from "./errors/errors";

const ModelNameRegex = /^[A-Za-z][A-Za-z0-9_]*$/;

export class Model {
  constructor(
    public name: string,
    public schema: Schema,
    public fields: Field[] = []
  ) {
    if (!name.match(ModelNameRegex)) throw new InvalidNameError(name, "model");
  }
  addField(name: string, type: DataType) {
    const _exists: Field | undefined = this.fields.find((f) => f.name === name);
    if (_exists) throw new NameConflictError(name, "field");
    const newField = new Field(name, this, type);
    this.fields.push(newField);
  }
  removeField(field: Field) {}
}
