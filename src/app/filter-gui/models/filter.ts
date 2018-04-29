import { Rule } from "./rule";
import { Disjunction } from "./disjunction";

export interface Filter {
    rules: Rule[],
    disjunctions: Disjunction[]
}