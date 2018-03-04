import { Injectable } from '@angular/core';
import { ITransaction } from './models/transaction.model';

import Dexie from 'dexie';

@Injectable()
export class DexieService extends Dexie {

  transactions: Dexie.Table<ITransaction, number>;

  constructor() {
    super('EliquaviDb');
    this.version(1).stores({
      transactions: '++id',
    });
}

}
