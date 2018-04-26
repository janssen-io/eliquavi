import { FilterService } from "./filter.service";
import { DexieService } from "./dexie.service";
import { IFilter } from "../models/filter.model";

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

    afterEach((done: DoneFn)=> { 
        service.getAll().then((fs) => {
            service.table.bulkDelete(fs.map(fs => fs.id)).then(() => done());
        });
    });

    afterAll(() => {
        // completely remove database
        db.delete();
    });
  
    it('#add creates an id', (done: DoneFn) => {
        service.add(filter).then(value => {
            expect(value).toBeDefined();
            done();
        });
    });
  
    it('#get returns the full filter object', (done: DoneFn) => {
        service.add(filter).then((id) => service.get(id)).then(value => {
            expect(value).toBeDefined();
            expect(value.name).toBe(filter.name);
            expect(value.content).toBe(filter.content);
            expect(value.enabled).toBe(filter.enabled);
            done();
        });
    });

    it('#get returns null if id does not exist', (done: DoneFn) => {
        service.get(1000).then((val) => {
            expect(val).toBeUndefined();
            done();
        });
    });

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

    it('#getAll returns all filters', (done: DoneFn) => {
        service.getAll().then((value) => {
            expect(value.length).toBe(0);
            done();
        });
    });
  });