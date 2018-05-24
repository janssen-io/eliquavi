import { Condition } from './condition';

export class OrGroup extends Condition {
    readonly any: Condition[] = [];
    get type() { return 'or'; }

    constructor(children: Condition[] = []) {
        super();
        children.forEach(c => this.add(c));
    }

    add(condition: Condition): void {
        this.any.push(condition);
        condition.onDelete.subscribe(() => {
            this.remove(condition);
        });
    }

    private remove(condition: Condition): void {
        const index = this.any.findIndex(c => c === condition);
        this.any.splice(index, 1);
    }
}
