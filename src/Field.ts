import { DataType } from "./DataType";
import { Model } from "./Model";
import { Reference } from "./Reference";

export class Field {
  constructor(
    public name: string,
    public model: Model,
    public type: DataType,
    private referencedBy: Reference[] = []
  ) {}

  private references?: Reference;

  /**
   * Makes this field reference another
   * @param referenced: the field that this field references
   */
  setReference(referenced: Field) {
    const newRef = new Reference(referenced, this);
    if (this.references) {
      this.references.referenced.removeReferenced(this.references);
    }
    this.references = newRef;
    referenced.addReferenced(newRef);
  }

  /**
   * Adds a new field to the list of fields that reference this
   * @param referencer
   */
  addReferenced(referencer: Reference) {
    if (!this.referencedBy.find((r) => r === referencer))
      this.referencedBy.push(referencer);
  }

  /**
   * Removes a field to the list of fields that reference this
   * @param referencer
   */
  removeReferenced(referencer: Reference) {
    this.referencedBy = this.referencedBy.filter((r) => r !== referencer);
  }
  /**
   *
   * @returns human-readable description including model name and field name
   */

  fullName(): string {
    return `${this.model.name}.${this.model}`;
  }

  /**
   *
   * @returns human-readable description including model name, field name and field type
   *
   */
  qualifiedName(): string {
    return `${this.model.name}.${this.model} : ${this.type.name}`;
  }
}
