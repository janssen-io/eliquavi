export abstract class Condition {
  parent: Condition;
  get type(): string { throw new Error('"get type" is not implemented.'); }
}
