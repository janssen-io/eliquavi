export abstract class Condition {
  get type(): string { throw new Error('"get type" is not implemented.'); }
}
