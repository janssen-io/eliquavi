import { Component, OnInit } from '@angular/core';
import { FilterService } from '../services/filter.service'
import { IFilter } from '../models/filter.model';

@Component({
  selector: 'app-filterbar',
  templateUrl: './filterbar.component.html',
  styleUrls: ['./filterbar.component.css']
})
export class FilterbarComponent implements OnInit {

  private filters: IFilter[];
  private newFilter: IFilter;

  private isDisabled = false;
  
  constructor(private service: FilterService) { 
    this.filters = [];
    this.resetFilter();
  }

  resetFilter() {
    this.newFilter = {
      name: "", content: "", enabled: true
    }
  }

  onSubmit() {  
    this.isDisabled = true;
    this.service.add(this.newFilter).then(id => {
      alert(`New filter saved with ID: ${this.newFilter}`);
      this.isDisabled = false;
      this.filters.push(this.newFilter);
      this.resetFilter();
    }).catch(reason => {
      this.isDisabled = false;
    });
  }

  ngOnInit() {
    this.service.table.toCollection()
    this.service.getAll().then(filters => {
      this.filters = filters.filter(filter => filter.enabled);
    });
  }
}
