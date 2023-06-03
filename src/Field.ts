import { DataType } from "./DataType";
import { Model } from "./Model";

export class Field {
  constructor(
    public name: string,
    public model: Model,
    public type: DataType,
    public references?: Field
  ) {}
}
