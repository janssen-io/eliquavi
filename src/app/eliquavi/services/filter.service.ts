import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';

import { IFilter } from '../models/filter.model';
import { SerializedFilter } from '../models/serialized-filter.model';
import { DexieService } from './dexie.service';
import { FilterDeserializer } from './filter.deserializer';
import { DataCloneVisitor } from '../../filter-gui/data-clone-visitor';

@Injectable()
export class FilterService {
  table: Dexie.Table<SerializedFilter, number>;

  constructor(private db: DexieService) {
    this.table = db.table('filters');
  }

  get(id: number): Promise<IFilter> {
    return this.table.get(id).then(
      (filter) => this.convert(filter),
      (reason) => null
    );
  }

  async getAll(): Promise<IFilter[]> {
    const filters = await this.table.toArray();
    return filters.map(this.convert);
  }

  add(filter: IFilter): Promise<number> {
    return this.table.add(this.serialize(filter));
  }

  update(id: number, filter: IFilter): Promise<number> {
    return this.table.update(id, this.serialize(filter));
  }

  remove(id) {
    return this.table.delete(id);
  }

  private serialize(filter: IFilter): SerializedFilter {
    const dataCloner = new DataCloneVisitor();
    filter.content.accept(dataCloner);
    return {
      name: filter.name,
      content: dataCloner.result,
      enabled: filter.enabled,
      id: filter.id
    };
  }

  private convert(filter: SerializedFilter): IFilter {
    return {
      name: filter.name,
      content: FilterDeserializer.parseCondition(filter.content),
      enabled: filter.enabled,
      id: filter.id
    };
  }
}
