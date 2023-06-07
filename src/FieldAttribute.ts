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

const attributes = [
  MapFieldAttribute,
  IdFieldAttribute,
  UpdatedAtFieldAttribute,
];

export {
  FieldAttribute,
  UniqueFieldAttribute,
  MapFieldAttribute,
  IdFieldAttribute,
  UpdatedAtFieldAttribute,
  attributes,
};
