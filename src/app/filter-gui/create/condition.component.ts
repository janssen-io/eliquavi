import { Component, OnInit, Input } from '@angular/core';
import { Condition } from '../models/condition';
import { Expression } from '../models/expression';
import { Operator } from '../models/operator';
import { AndGroup } from '../models/and-group';
import { OrGroup } from '../models/or-group';

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
}
