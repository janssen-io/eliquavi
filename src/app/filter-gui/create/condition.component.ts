import { Component, OnInit, Input } from '@angular/core';
import { Condition, Expression, Operator, AndGroup, OrGroup } from '../models';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
})
export class ConditionComponent implements OnInit {

  @Input()
  condition: Condition;

  constructor() { }

  ngOnInit() {
  }

  addExpression(): void {
    const newExpr = new Expression('', Operator.EqualTo, '');
    if (!this.condition) {
      this.condition = newExpr;
      return;
    }
    if (this.condition instanceof Expression) {
      this.condition = new AndGroup([this.condition]);
    }
    (<AndGroup|OrGroup>this.condition).conditions.push(newExpr);
  }

  addAnd(): void {
    const newAnd = new AndGroup([]);

    if (!this.condition) {
      this.condition = newAnd;
      return;
    }
    if (this.condition instanceof Expression) {
      this.condition = new AndGroup([this.condition]);
      return;
    }
    (<AndGroup|OrGroup>this.condition).conditions.push(newAnd);
  }
}
