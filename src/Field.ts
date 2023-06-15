import {
  IdFieldAttribute,
  InvalidNameError,
  InvalidReferenceFieldError,
  NameConflictError,
} from "../index";
import { DataType } from "./DataType";
import { Model } from "./Model";
import { Reference } from "./Reference";
import { FieldAttribute } from "../index";

const FieldNameRegex = /^[A-Za-z][A-Za-z0-9_]*$/;

export class Field {
  constructor(
    public name: string,
    public model: Model,
    public type: DataType,
    public attributes: FieldAttribute[] = [],
    public referencedBy: Reference[] = []
  ) {
    if (!name.match(FieldNameRegex)) throw new InvalidNameError(name, "field");
  }

  public references?: Reference;

  /**
   * Makes this field reference another
   * @param referenced: the field that this field references
   */
  setReference(referenced: Field) {
    const newRef = new Reference(referenced, this);
    if (!referenced.isId()) throw new InvalidReferenceFieldError(referenced);
    if (this.references) {
      this.references.referenced.removeReferenced(this.references);
    }
    this.references = newRef;
    referenced.addReferenced(newRef);
  }

  /**
   *
   * @returns true if this field has an id attribute
   */
  isId(): boolean {
    return this.attributes.includes(IdFieldAttribute);
  }

  /**
   *
   * @param data: new data
   * @returns the updated field
   */
  updateField(data: { name: string }): Field {
    const { name } = data;
    if (name) {
      const exists = this.model.getFieldByName(name);
      if (exists !== null && exists !== this) {
        throw new NameConflictError(name, "field");
      } else {
        this.name = name;
      }
    }
    return this;
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

  fullName(options: { attributes: Boolean } = { attributes: false }): string {
    const attrStr = this.attributes.map((a) => `@${a.name}`).join(" ");
    return `${this.model.name}.${this.name}${
      options.attributes ? ` ${attrStr}` : ""
    }`;
  }

  /**
   *
   * @returns human-readable description including model name, field name and field type
   *
   */
  qualifiedName(): string {
    return `${this.model.name}.${this.name} : ${this.type.name}`;
  }

  toSerial() {
    return {
      name: this.name,
      type: this.type.name,
      attributes: this.attributes.map((a) => a.toSerial()),
      references: this.references
        ? {
            model: this.references.referenced.model.name,
            field: this.references.referenced.name,
          }
        : undefined,
    };
  }
}
