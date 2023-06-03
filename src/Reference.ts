import { Field } from "./Field";
import { IncompatibleReferenceTypeError } from "./errors/errors";

export class Reference {
  constructor(public referenced: Field, public referencer: Field) {
    if (referencer.type !== referenced.type) {
      throw new IncompatibleReferenceTypeError(referenced, referencer);
    }
  }
}
