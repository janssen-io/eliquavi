import { Condition } from './condition';

export class AndGroup extends Condition {
    get type() { return 'and'; }

    constructor(public all: Condition[] = []) {
        super();
    }

    add(condition: Condition): void {
        this.all.push(condition);
    }
}
