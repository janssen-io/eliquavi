import { Condition } from './condition';

export class AndGroup extends Condition {
    get type() { return 'and'; }

    constructor(public conditions: Condition[] = []) {
        super();
    }
}
