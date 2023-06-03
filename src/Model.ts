import { DataType } from "./DataType";
import { Field } from "./Field";
import { Schema } from "./Schema";
import { NameConflictError } from "./errors/errors";

export class Model {
  constructor(
    public name: string,
    public schema: Schema,
    public fields: Field[] = []
  ) {}
  addField(name: string, type: DataType) {
    const _exists: Field | undefined = this.fields.find((f) => f.name === name);
    if (_exists) throw new NameConflictError(name, "field");
  }
  removeField(field: Field) {
    
  }
}
