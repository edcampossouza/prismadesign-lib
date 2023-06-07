import {
  FieldAttribute,
  IdFieldAttribute,
  UniqueFieldAttribute,
  MapFieldAttribute,
  UpdatedAtFieldAttribute,
} from "./FieldAttribute";

class DataType {
  constructor(
    public name: string,
    public possibleAttributes: FieldAttribute[] = []
  ) {}
}

const IntType = new DataType("Int", [
  IdFieldAttribute,
  UniqueFieldAttribute,
  MapFieldAttribute,
]);

const StringType = new DataType("String", [
  IdFieldAttribute,
  UniqueFieldAttribute,
  MapFieldAttribute,
]);

const BooleanType = new DataType("Boolean");
const DecimalType = new DataType("Decimal");
const DateTimeType = new DataType("DateTime", [
  IdFieldAttribute,
  UniqueFieldAttribute,
  MapFieldAttribute,
  UpdatedAtFieldAttribute,
]);

export {
  IntType,
  StringType,
  BooleanType,
  DecimalType,
  DateTimeType,
  DataType,
};
