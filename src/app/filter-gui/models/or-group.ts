import { Condition } from './condition';

export class OrGroup extends Condition {
    get type() { return 'or'; }

    constructor(public any: Condition[] = []) {
        super();
    }

    add(condition: Condition): void {
        this.any.push(condition);
        condition.parent = this;
    }

    remove(condition: Condition): void {
        const index = this.any.findIndex(c => c === condition);
        this.any.splice(index, 1);
    }
}
