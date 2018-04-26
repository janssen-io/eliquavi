import { Component, OnInit } from '@angular/core';
import { IFilter } from '../models/filter.model';
import { FilterService } from '../services/filter.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent {
  private filter: IFilter;
  private filters: IFilter[];

  private editorOptions = {theme: 'vs-dark', language: 'ruby'};
  private code: string = '';

  private id: number | undefined;
  private formEnabled = false;
  
  constructor(
    private service: FilterService,
    private router: Router,
    route: ActivatedRoute
  ) {
    route.params.subscribe(parameters => {
      this.loadFilters();
      this.loadModel(+parameters['id']).then((filter) => {
        if(!filter){
          // router.navigate(['/app/filters']);
          return;
        }
        this.filter = filter;
        this.code = this.filter.content;
        this.enableForm();
      })
    });
  }

  loadFilters(){
    this.service.getAll().then(filters => {
      this.filters = filters;
    });
  }

  loadModel(id: number | undefined): Promise<IFilter> {
    if(id){
      return this.service.get(id).then(filter => {
        return filter;
      });
    }
    return Promise.resolve({
      name: "",
      content: "",
      enabled: true
    });
  }

  onSubmit() {
    this.disableForm();
    if(this.filter && this.filter.id){
      this.filter.content = this.code;
      this.service.update(this.filter.id, this.filter)
        .then(() => this.enableForm())
        .catch(() => alert('Something went wrong...'));
    } else if(this.filter) {
      this.filter.content = this.code;
      this.service.add(this.filter)
        .then(id => this.router.navigate(['/app/filters', id]))
        .catch(() => alert('Something went wrong...'));
    }
  }

  onDelete() {
    // TODO
  }

  enableForm() {
    this.formEnabled = true;
  }

  disableForm() {
    this.formEnabled = false;
  }
}
