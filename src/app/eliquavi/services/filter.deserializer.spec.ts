import { Filter, Expression, Operator, AndGroup, Condition, OrGroup } from '../../filter-gui/models';
import { FilterDeserializer } from './filter.deserializer';
import { DataCloneVisitor } from '../../filter-gui/data-clone-visitor';

function s(obj: Condition): { [index: string]: any } {
  const dataCloner = new DataCloneVisitor();
  obj.accept(dataCloner);
  return dataCloner.result;
}

function replacer(k, v) {
  if (typeof v === 'function') {
      v = v.toString();
  } else if (window['File'] && v instanceof File) {
      v = '[File]';
  } else if (window['FileList'] && v instanceof FileList) {
      v = '[FileList]';
  }
  return v;
}

describe('Filter Deserializer', () => {
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
      const deserialized = <AndGroup>FilterDeserializer.parseCondition(serialized);
      expect(deserialized.all.length).toBe(subject.all.length);
    });

    it('should deserialize Or groups with children', () => {
      const subject = new OrGroup([Expression.Empty()]);
      const serialized = s(subject);
      const deserialized = <OrGroup>FilterDeserializer.parseCondition(serialized);
      expect(deserialized.any.length).toBe(subject.any.length);
    });
  });
});
