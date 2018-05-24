import { DataCloneVisitor } from './data-clone-visitor';
import { Expression, Operator, AndGroup, OrGroup } from './models';

describe('DataCloneVisitor', () => {
  it('should copy the data fields from Expressions', () => {
    const dataCloner = new DataCloneVisitor();
    const expression = new Expression('left', Operator.GreaterOrEqual, 'right');
    expression.accept(dataCloner);
    expect(dataCloner.result).toEqual({
      leftHand: expression.leftHand,
      operator: expression.operator,
      rightHand: expression.rightHand
    });
  });

  it('should copy data from the children of AndGroups', () => {
    const dataCloner = new DataCloneVisitor();
    const expression = new Expression('left', Operator.GreaterOrEqual, 'right');
    const empty = Expression.Empty();
    const group = new AndGroup([expression, empty]);
    group.accept(dataCloner);
    expect(dataCloner.result).toEqual({
      all: [
        {
          leftHand: expression.leftHand,
          operator: expression.operator,
          rightHand: expression.rightHand
        },
        {
          leftHand: empty.leftHand,
          operator: empty.operator,
          rightHand: empty.rightHand
        }
    ]
    });
  });

  it('should copy data from the children of OrGroups', () => {
    const dataCloner = new DataCloneVisitor();
    const expression = new Expression('left', Operator.GreaterOrEqual, 'right');
    const empty = Expression.Empty();
    const group = new OrGroup([expression, empty]);
    group.accept(dataCloner);
    expect(dataCloner.result).toEqual({
      any: [
        {
          leftHand: expression.leftHand,
          operator: expression.operator,
          rightHand: expression.rightHand
        },
        {
          leftHand: empty.leftHand,
          operator: empty.operator,
          rightHand: empty.rightHand
        }
    ]
    });
  });
});
