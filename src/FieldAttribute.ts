import { InvalidFieldAttributeName } from "../index";

class FieldAttribute {
  constructor(public name: string) {}
  toSerial() {
    return { name: this.name };
  }
}

const IdFieldAttribute = new FieldAttribute("id");
const UniqueFieldAttribute = new FieldAttribute("unique");
const MapFieldAttribute = new FieldAttribute("map");
const UpdatedAtFieldAttribute = new FieldAttribute("updatedAt");
const DefaultFieldAttribute = new FieldAttribute("default");

const attributes = [
  MapFieldAttribute,
  IdFieldAttribute,
  UpdatedAtFieldAttribute,
  DefaultFieldAttribute,
  UniqueFieldAttribute,
];

function getFieldAttributeInstance(name: string): FieldAttribute {
  const attribute = attributes.find((a) => a.name === name);
  if (!attribute) throw new InvalidFieldAttributeName(name);
  return attribute;
}

export {
  FieldAttribute,
  UniqueFieldAttribute,
  MapFieldAttribute,
  IdFieldAttribute,
  UpdatedAtFieldAttribute,
  DefaultFieldAttribute,
  attributes,
  getFieldAttributeInstance,
};
