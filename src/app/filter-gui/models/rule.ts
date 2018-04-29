import { Operator } from "./operator";

export interface Rule {
    column: string,
    operator: Operator
    value: string | RegExp | number,
    inverted: boolean
}
