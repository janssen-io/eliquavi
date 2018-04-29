import { Rule } from "./rule";

export interface Disjunction {
    rules: Rule[],
    disjunctions: Disjunction[],
    inverted: boolean
}