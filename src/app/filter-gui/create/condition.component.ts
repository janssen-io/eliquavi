import { Component, OnInit, Input } from '@angular/core';
import { Condition, Expression, Operator, AndGroup, OrGroup } from '../models';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.css']
})
export class ConditionComponent implements OnInit {

  @Input()
  condition: Condition;

  constructor() {
    if (!this.condition) {
      this.condition = new AndGroup();
    }
  }

  ngOnInit() { }

  addExpression(): void {
    const newExpr = new Expression('lhs', Operator.EqualTo, 'rhs');
    if (!this.condition) {
      this.condition = newExpr;
      return;
    }
    if (this.condition instanceof Expression) {
      this.condition = new AndGroup([this.condition]);
    }
    (<AndGroup|OrGroup>this.condition).add(newExpr);
  }

  addAnd(): void {
    this.addGroup(new AndGroup());
  }

  addOr(): void {
    this.addGroup(new OrGroup());
  }

  private addGroup(group: AndGroup | OrGroup): void {
    if (!this.condition) {
      this.condition = group;
      return;
    }

    if (this.condition instanceof Expression) {
      group.add(this.condition);
      this.condition = group;
      return;
    }
    (<AndGroup|OrGroup>this.condition).add(group);
  }
}
