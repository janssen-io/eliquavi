import { EventEmitter } from '@angular/core';
import { IConditionVisitor } from '../condition-visitor.interface';

export abstract class Condition {
  public onDelete = new EventEmitter();
  get type(): string { throw new Error('"get type" is not implemented.'); }

  get hasParent(): boolean {
    return this.onDelete.observers.length > 0;
  }

  accept(visitor: IConditionVisitor) {
    throw new Error('"accept" is not implemented.');
  }
}
