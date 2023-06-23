import { DataType } from "./DataType";
import { Field } from "./Field";
import { Schema } from "./Schema";
import { FieldAttribute, IdFieldAttribute } from "./FieldAttribute";
import {
  DeletedReferenceError,
  DuplicatedIdError,
  InvalidNameError,
  NameConflictError,
} from "./errors/errors";

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
    defaultValue?: string,
    fieldAttributes: FieldAttribute[] = []
  ) {
    const _exists: Field | undefined = this.fields.find((f) => f.name === name);
    if (_exists) throw new NameConflictError(name, "field");
    if (fieldAttributes.includes(IdFieldAttribute)) {
      const idField = this.getIdField();
      if (idField !== null) throw new DuplicatedIdError(idField, name);
    }
    const newField = new Field(name, this, type, defaultValue, fieldAttributes);
    this.fields.push(newField);
    return newField;
  }

  getIdField(): Field | null {
    const idField = this.fields.find((f) =>
      f.attributes.includes(IdFieldAttribute)
    );
    return idField || null;
  }

  removeField(field: Field) {
    if (field.referencedBy.length !== 0)
      throw new DeletedReferenceError(field, field.referencedBy[0].referencer);
    field.removeReference();
    this.fields = this.fields.filter((f) => f !== field);
  }

  getFieldByName(name: string): Field | null {
    return this.fields.find((f) => f.name === name) || null;
  }

  toSerial() {
    return {
      name: this.name,
      fields: this.fields.map((f) => f.toSerial()),
    };
  }
}
