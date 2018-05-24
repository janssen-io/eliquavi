import { IConditionVisitor } from './condition-visitor.interface';
import { Expression, AndGroup, OrGroup } from './models';
import { Injectable } from '@angular/core';

@Injectable()
export class DataCloneVisitor implements IConditionVisitor {
  private _result: { [index: string]: any } = {};
  get result() { return this._result; }

  reset() {
    this._result = {};
  }

  visitExpression(expression: Expression) {
    const data = {
      leftHand: expression.leftHand,
      operator: expression.operator,
      rightHand: expression.rightHand
    };
    this.store(data);
  }
  visitAndGroup(andGroup: AndGroup) {
    const data = { all: [] };
    this.store(data);
  }
  visitOrGroup(orGroup: OrGroup) {
    const data = { any: [] };
    this.store(data);
  }

  private store(data: { [index: string]: any }) {
    if (this._result.any) {
      (<any[]>this._result.any).push(data);
    } else if (this._result.all) {
      (<any[]>this._result.all).push(data);
    } else {
      this._result = data;
    }
  }
}
