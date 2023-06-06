class DataType {
  constructor(public name: string) {}
}

const IntType = new DataType("Int");
const StringType = new DataType("String");
const BooleanType = new DataType("Boolean");
const DecimalType = new DataType("Decimal");
const DateTimeType = new DataType("DateTime");

export {
  IntType,
  StringType,
  BooleanType,
  DecimalType,
  DateTimeType,
  DataType,
};
