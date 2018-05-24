import { FilterService } from './filter.service';
import { DexieService } from './dexie.service';
import { IFilter } from '../models/filter.model';
import { Filter, AndGroup, Expression } from '../../filter-gui/models';
import { FilterDeserializer } from './filter.deserializer';
// import { Filter, Condition, AndGroup } from '../../filter-gui/models';

describe('FilterService', () => {
    let db: DexieService;
    let service: FilterService;
    let filter: IFilter;

    beforeAll(() => {
        // create named database
        db = new DexieService('EliquaviTest');
    });

    beforeEach(() => {
        service = new FilterService(db);
        filter = {
            name: Math.random().toString(36).slice(2),
            content: Math.random().toString(36).slice(2),
            enabled: true
        };
    });

    afterEach((done: DoneFn) => {
        service.getAll().then((fs) => {
            service.table.bulkDelete(fs.map(f => f.id)).then(() => done());
        });
    });

    afterAll(() => {
        // completely remove database
        db.delete();
    });

    describe('#add', () => {
        it('should assign an id', (done: DoneFn) => {
            service.add(filter).then(value => {
                expect(value).toBeDefined();
                done();
            });
        });
    });

    describe('#get', () => {
        it('returns the full filter object', (done: DoneFn) => {
            service.add(filter).then((id) => service.get(id)).then(value => {
                expect(value).toBeDefined();
                expect(value.name).toBe(filter.name);
                expect(JSON.stringify(value.content)).toEqual(JSON.stringify(filter.content));
                expect(value.enabled).toBe(filter.enabled);
                done();
            });
        });

        it('it should return the full filter object', (done: DoneFn) => {
            service.add(filter).then((id) => service.get(id)).then(value => {
                expect(value).toBeDefined();
                expect(value.name).toBe(filter.name);
                expect(value.content).toEqual(filter.content);
                expect(value.enabled).toBe(filter.enabled);
                done();
            });
        });

        it('it should return null if id does not exist', (done: DoneFn) => {
            service.get(1000).then((val) => {
                expect(val).toBeUndefined();
                done();
            });
        });
    });

    describe('#remove', () => {
        it('#remove deletes the persisted filter', async (done: DoneFn) => {
            service.add(filter).then(id => {
                service.remove(id).then(() => {
                    service.get(id).then((value) => {
                        expect(value).toBeUndefined();
                        done();
                    });
                });
            });
        });
    });

    describe('#getAll', () => {
        it('it should all filters', (done: DoneFn) => {
            service.getAll().then((value) => {
                expect(value.length).toBe(0);
                done();
            });
        });
    });

    describe('Filter Integration', () => {
        it('should store deserializable JSON.', async (done: DoneFn) => {
            const subject = new Filter();
            subject.condition = new AndGroup([Expression.Empty()]);
            const stored: IFilter = {
                name: 'Actual Filter',
                content: JSON.stringify(subject),
                enabled: true
            };
            const storedId = await service.add(stored);
            const record = await service.get(storedId);
            const serialized = JSON.parse(record.content);
            expect(FilterDeserializer.parseFilter(serialized)).toEqual(subject);
            done();
        });
    });
  });
