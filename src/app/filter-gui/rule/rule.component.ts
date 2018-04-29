import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Rule } from '../models/rule';
import { Operator } from '../models/operator';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css']
})
export class RuleComponent implements OnInit {

  private rule: Rule;
  private operators: Operator[];

  constructor() { 
    this.rule = {
      column: "",
      operator: Operator.EqualTo,
      value: "",
      inverted: false
    }
    
    this.operators = [
      Operator.Match, Operator.NotMatch,
      Operator.EqualTo, Operator.NotEqualTo,
      Operator.LessThan, Operator.GreaterThan,
      Operator.LessOrEqual, Operator.GreaterOrEqual
    ];
  }

  ngOnInit() {
  }

}
