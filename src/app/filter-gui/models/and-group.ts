import { Condition } from './condition';

export class AndGroup extends Condition {
    readonly all: Condition[] = [];
    get type() { return 'and'; }

    constructor(children: Condition[] = []) {
        super();
        children.forEach(c => this.add(c));
    }

    add(condition: Condition): void {
        this.all.push(condition);
        condition.onDelete.subscribe(() => {
            this.remove(condition);
        });
    }

    private remove(condition: Condition): void {
        const index = this.all.findIndex(c => c === condition);
        this.all.splice(index, 1);
    }
}
