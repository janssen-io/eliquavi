import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';

import { ITransaction } from './models/transaction.model'
import { DexieService } from './dexie.service';

@Injectable()
export class TransactionService {
  table: Dexie.Table<ITransaction, number>;

  constructor(private db: DexieService) {
    this.table = db.table('transactions');
  }

  getAll() {
    return this.table.toArray();
  }

  add(transaction: ITransaction): Promise<number> {
    return this.table.add(transaction);
  }

  update(id: number, transaction: ITransaction): Promise<number> {
    return this.table.update(id, transaction);
  }

  remove(id) {
    return this.table.delete(id);
  }
}
