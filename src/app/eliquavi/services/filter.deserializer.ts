import { Filter, Condition, Expression, Operator } from '../../filter-gui/models';

export class FilterDeserializer {
  static parseFilter(json): Filter {
    const result = new Filter();
    if (json.condition) {
      result.condition = FilterDeserializer.parseCondition(json.condition);
    }
    return result;
  }

  static parseCondition(cond: { [index: string]: string}): Condition {
    return new Expression(
      cond.leftHand, cond.operator, cond.rightHand
    );
  }
}
