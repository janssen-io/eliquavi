import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { Disjunction } from '../models/disjunction';
import { RuleComponent } from '../rule/rule.component';

@Component({
  selector: 'app-disjunction',
  templateUrl: './disjunction.component.html',
  styleUrls: ['./disjunction.component.css']
})
export class DisjunctionComponent implements OnInit {

  private disjunction: Disjunction;

  @ViewChild('rules', {read: ViewContainerRef})
  private rulesContainer: ViewContainerRef;

  @ViewChild('disjunctions', {read: ViewContainerRef})
  disjunctionsContainer: ViewContainerRef;

  constructor(private componentFactory: ComponentFactoryResolver) {
    this.disjunction = {
      rules: [],
      disjunctions: [],
      inverted: false
    };
  }

  ngOnInit() {
  }

  addRule() {
    let ruleFactory = this.componentFactory.resolveComponentFactory(RuleComponent);
    let componentRef = this.rulesContainer.createComponent(ruleFactory)
  }

  addDisjunction() {
    let disjunctionFactory
      = this.componentFactory.resolveComponentFactory(DisjunctionComponent);
    let componentRef = this.disjunctionsContainer.createComponent(disjunctionFactory);
  }
}
