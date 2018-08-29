import { Condition } from '../../filter-gui/models';

export interface IFilter {
  id?: number;
  name: string;
  content: Condition;
  enabled: boolean;
}
