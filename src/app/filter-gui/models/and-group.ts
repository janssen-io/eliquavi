import { Condition } from './condition';

export class AndGroup extends Condition {
    get type() { return 'and'; }

    constructor(public all: Condition[] = []) {
        super();
    }

    add(condition: Condition): void {
        this.all.push(condition);
        condition.parent = this;
    }

    remove(condition: Condition): void {
        const index = this.all.findIndex(c => c === condition);
        this.all.splice(index, 1);
    }
}
