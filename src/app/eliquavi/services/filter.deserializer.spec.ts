import { Filter, Expression, Operator } from '../../filter-gui/models';
import { FilterDeserializer } from './filter.deserializer';

describe('Filter Deserializer', () => {
  describe('#parseFilter', () => {
    it('should deserialize an empty filter', () => {
      const emptyFilter = new Filter();
      const serialized = JSON.stringify(emptyFilter);
      expect(FilterDeserializer.parseFilter(serialized)).toEqual(emptyFilter);
    });

    xit('should deserialize a filter with a condition', () => {
      const filter = new Filter();
      filter.condition = new Expression('lhs', Operator.EqualTo, 'rhs');
      const serialized = JSON.parse(JSON.stringify(filter));
      expect(FilterDeserializer.parseFilter(serialized)).toEqual(filter);
    });
  });

  describe('#parseCondition', () => {
    it('should deserialize expressions', () => {
      const expression = new Expression('lhs', Operator.EqualTo, 'rhs');
      const serialized = JSON.parse(JSON.stringify(expression));
      expect(FilterDeserializer.parseCondition(serialized)).toEqual(expression);
    });

    xit('should deserialize And groups', () => {

    });

    xit('should deserialize And groups', () => {

    });
  });
});
