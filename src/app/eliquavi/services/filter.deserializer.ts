import { Filter, Condition, Expression, Operator, AndGroup, OrGroup } from '../../filter-gui/models';

export class FilterDeserializer {
  static parseFilter(json: {[index: string]: any}): Filter {
    const result = new Filter();
    if (json.condition) {
      result.condition = FilterDeserializer.parseCondition(json.condition);
    }
    return result;
  }

  static parseCondition(json: { [index: string]: any}): Condition {
    if (json.all) {
      const children = (<any[]>json.all).map(c => FilterDeserializer.parseCondition(c));
      const result = new AndGroup(children);
      return result;
    }

    if (json.any) {
      const children = (<any[]>json.any).map(c => FilterDeserializer.parseCondition(c));
      const result = new OrGroup(children);
      return result;
    }

    return new Expression(
      json.leftHand, <Operator>json.operator, json.rightHand
    );
  }
}
