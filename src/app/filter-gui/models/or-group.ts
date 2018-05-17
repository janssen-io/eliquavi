import { Condition } from './condition';

export class OrGroup extends Condition {
    get type() { return 'or'; }

    constructor(public any: Condition[] = []) {
        super();
    }

    add(condition: Condition): void {
        this.any.push(condition);
    }
}
