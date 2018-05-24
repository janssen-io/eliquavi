import { Condition } from './condition';
import { Operator } from './operator';
import { IConditionVisitor } from '../condition-visitor.interface';

export class Expression extends Condition {
    get type() { return 'expression'; }

    constructor(
        public leftHand: string,
        public operator: Operator,
        public rightHand: string
    ) { super(); }

    static Empty(): Expression {
        return new Expression('', Operator.EqualTo, '');
    }

    accept(visitor: IConditionVisitor) {
        visitor.visitExpression(this);
    }
}
