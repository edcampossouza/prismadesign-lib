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

export class InvalidNameError extends Error {
  constructor(public name: string, type: "model" | "field") {
    super(`Invalid ${type} name: ${name}`);
  }
}

export class DuplicatedIdError extends Error {
  constructor(public idField: Field, newIdName: string) {
    super(
      `Can't create id field ${newIdName}: ${idField.model.name} already has an id field ${idField.name}`
    );
  }
}

export class InvalidReferenceFieldError extends Error {
  constructor(referenced: Field) {
    super(
      `Can't create reference: field ${referenced.fullName()} is not an @id`
    );
  }
}
