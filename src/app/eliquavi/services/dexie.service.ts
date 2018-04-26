import { Injectable, InjectionToken, Inject } from '@angular/core';
import { ITransaction } from '../models/transaction.model';

import Dexie from 'dexie';
import { IFilter } from '../models/filter.model';

export const DB_NAME = new InjectionToken<string>('db.name');

@Injectable()
export class DexieService extends Dexie {

  private transactions: Dexie.Table<ITransaction, number>;
  private filters: Dexie.Table<IFilter, number>;

  constructor(@Inject(DB_NAME) name: string = 'EliquaviDb') {
    super(name);
    this.version(1).stores({
      transactions: '++id',
      filters: '++id, &name, content, enabled'
    });
  }
}
