import { Filter, Expression, Operator, AndGroup, Condition, OrGroup } from '../../filter-gui/models';
import { FilterDeserializer } from './filter.deserializer';

function s(obj: Filter | Condition): { [index: string]: any } {
  return JSON.parse(JSON.stringify(obj));
}

describe('Filter Deserializer', () => {
  describe('#parseFilter', () => {
    it('should deserialize an empty filter', () => {
      const subject = new Filter();
      const serialized = s(subject);
      expect(FilterDeserializer.parseFilter(serialized)).toEqual(subject);
    });

    it('should deserialize a filter with a condition', () => {
      const subject = new Filter();
      subject.condition = new Expression('lhs', Operator.EqualTo, 'rhs');
      const serialized = JSON.parse(JSON.stringify(subject));
      expect(FilterDeserializer.parseFilter(serialized)).toEqual(subject);
    });
  });

  describe('#parseCondition', () => {
    it('should deserialize expressions', () => {
      const subject = new Expression('lhs', Operator.EqualTo, 'rhs');
      const serialized = s(subject);
      expect(FilterDeserializer.parseCondition(serialized)).toEqual(subject);
    });

    it('should deserialize And groups', () => {
      const subject = new AndGroup();
      const serialized = s(subject);
      expect(FilterDeserializer.parseCondition(serialized)).toEqual(subject);
    });

    it('should deserialize Or groups', () => {
      const subject = new OrGroup();
      const serialized = s(subject);
      expect(FilterDeserializer.parseCondition(serialized)).toEqual(subject);
    });

    it('should deserialize And groups with children', () => {
      const subject = new AndGroup([Expression.Empty()]);
      const serialized = s(subject);
      expect(FilterDeserializer.parseCondition(serialized)).toEqual(subject);
    });

    it('should deserialize Or groups with children', () => {
      const subject = new OrGroup([Expression.Empty()]);
      const serialized = s(subject);
      expect(FilterDeserializer.parseCondition(serialized)).toEqual(subject);
    });
  });
});
