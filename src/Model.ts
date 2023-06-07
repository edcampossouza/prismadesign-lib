import { DataType } from "./DataType";
import { Field } from "./Field";
import { Schema } from "./Schema";
import { FieldAttribute } from "./FieldAttribute";
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

  addField(
    name: string,
    type: DataType,
    fieldAttributes: FieldAttribute[] = []
  ) {
    const _exists: Field | undefined = this.fields.find((f) => f.name === name);
    if (_exists) throw new NameConflictError(name, "field");
    const newField = new Field(name, this, type, fieldAttributes);
    this.fields.push(newField);
    return newField;
  }

  removeField(field: Field) {}

  toSerial() {
    return {
      name: this.name,
      fields: this.fields.map((f) => f.toSerial()),
    };
  }
}
