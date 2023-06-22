import {
  DeserializationError,
  Field,
  NameConflictError,
  getFieldAttributeInstance,
} from "../index";
import { Model } from "./Model";
import { getDataTypeInstance } from "../index";

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

  findModel(name: string): Model | null {
    return this.models.find((m) => m.name === name) || null;
  }

  findField(modelName: string, fieldName: string): Field | null {
    const model = this.findModel(modelName);
    if (model) return model.getFieldByName(fieldName);
    return null;
  }

  toSerial(): SerializedSchema {
    return {
      name: this.name,
      models: this.models.map((m) => m.toSerial()),
    };
  }
}

function deserializeSchema(serializedSchema: SerializedSchema): Schema {
  const schema = new Schema(serializedSchema.name);
  const fieldsToResolve: { field: Field; toModel: string; toField: string }[] =
    [];
  serializedSchema.models.forEach((modelS) => {
    const newModel = schema.addModel(modelS.name);
    modelS.fields.forEach((fieldS) => {
      const field = newModel.addField(
        fieldS.name,
        getDataTypeInstance(fieldS.type),
        fieldS.default,
        fieldS.attributes.map((a) => getFieldAttributeInstance(a.name))
      );
      if (fieldS.references) {
        fieldsToResolve.push({
          field,
          toModel: fieldS.references.model,
          toField: fieldS.references.field,
        });
      }
    });
  });
  for (const ref of fieldsToResolve) {
    const { field, toField, toModel } = ref;
    const target = schema.findField(toModel, toField);
    if (target) {
      field.setReference(target);
    } else {
      throw new DeserializationError(`field not found: ${toModel}.${toField}`);
    }
  }

  return schema;
}

export { Schema, SerializedSchema, deserializeSchema };
