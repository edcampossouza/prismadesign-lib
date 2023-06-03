import { Field } from "../Field";

export class NameConflictError extends Error {
  constructor(public name: string, public type: "field" | "model") {
    super(`duplicated ${type} name: ${name}`);
  }
}

export class DeletedReferenceError extends Error {
  constructor(public referenced: Field, referencer: Field) {
    super(
      `Cannot delete field ${
        referenced.name
      } as it is referenced by ${referencer.fullName()}`
    );
  }
}

export class IncompatibleReferenceTypeError extends Error {
  constructor(public referenced: Field, referencer: Field) {
    super(
      `Cannot set a reference from ${referencer.qualifiedName()} to ${referenced.qualifiedName()}`
    );
  }
}
