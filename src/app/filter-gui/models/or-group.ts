import { Condition } from './condition';

export class OrGroup extends Condition {
    get type() { return 'or'; }

    constructor(public conditions: Condition[] = []) {
        super();
    }
}
