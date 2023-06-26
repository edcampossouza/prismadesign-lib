import { InvalidDataTypeName } from "../index";
import {
  FieldAttribute,
  IdFieldAttribute,
  UniqueFieldAttribute,
  UpdatedAtFieldAttribute,
  DefaultFieldAttribute,
} from "./FieldAttribute";

class DataType {
  constructor(
    public name: string,
    public possibleAttributes: FieldAttribute[] = [],
    public defaultValidator: (value: string) => boolean = () => true
  ) {}
}

function IntTypeValidator(value: string): boolean {
  return value === "autoincrement()" || value.match(/^\d+$/) !== null;
}

const IntType = new DataType(
  "Int",
  [IdFieldAttribute, UniqueFieldAttribute, DefaultFieldAttribute],
  IntTypeValidator
);

const StringType = new DataType("String", [
  IdFieldAttribute,
  DefaultFieldAttribute,
  UniqueFieldAttribute,
]);

const BooleanType = new DataType("Boolean", [DefaultFieldAttribute], (value) =>
  ["true", "false"].includes(value)
);

function DecimalTypeValidator(value: string): boolean {
  const decimalVal = parseFloat(value);
  return !isNaN(decimalVal);
}

const DecimalType = new DataType(
  "Decimal",
  [DefaultFieldAttribute],
  DecimalTypeValidator
);

const DateTimeType = new DataType(
  "DateTime",
  [UniqueFieldAttribute, UpdatedAtFieldAttribute],
  (value) => value === "now()"
);

const _allTypes = [IntType, StringType, DecimalType, BooleanType, DateTimeType];

function getDataTypeInstance(name: string): DataType {
  const dt = _allTypes.find((t) => t.name === name);
  if (!dt) {
    throw new InvalidDataTypeName(name);
  }
  return dt;
}

export {
  IntType,
  StringType,
  BooleanType,
  DecimalType,
  DateTimeType,
  DataType,
  getDataTypeInstance,
};
