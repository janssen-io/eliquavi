import { EventEmitter } from '@angular/core';

export abstract class Condition {
  public onDelete = new EventEmitter();
  get type(): string { throw new Error('"get type" is not implemented.'); }

  get hasParent(): boolean {
    return this.onDelete.observers.length > 0;
  }
}
