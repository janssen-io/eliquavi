import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';

import { IFilter } from '../models/filter.model';
import { DexieService } from './dexie.service';

@Injectable()
export class FilterService {
  table: Dexie.Table<IFilter, number>;

  constructor(private db: DexieService) {
    this.table = db.table('filters');
  }

  get(id: number): Promise<IFilter> {
    return this.table.get(id).then(filter => {
      return filter;
    });
  }

  getAll() {
    return this.table.toArray();
  }

  add(filter: IFilter): Promise<number> {
    return this.table.add(filter);
  }

  update(id: number, filter: IFilter): Promise<number> {
    return this.table.update(id, filter);
  }

  remove(id) {
    return this.table.delete(id);
  }
}
