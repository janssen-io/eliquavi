import { Expression, AndGroup, OrGroup } from './models';

export interface IConditionVisitor {
  visitExpression(expression: Expression);
  visitAndGroup(andGroup: AndGroup);
  visitOrGroup(orGroup: OrGroup);
}
