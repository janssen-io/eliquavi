import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';

import { IFilter } from '../models/filter.model';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent {
  private filter: IFilter;
  private filters: IFilter[];

  private editorOptions = {theme: 'vs-dark', language: 'ruby'};
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
          router.navigate(['/app/filters']);
        }
        this.filter = filter;
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

  onSubmit(form: NgForm) {
    form.options = {updateOn: 'submit'};
    this.disableForm();
    if(this.filter && this.filter.id){
      this.service.update(this.filter.id, this.filter)
      .then(() => this.enableForm())
      .catch(() => alert('Something went wrong... 1'));
    } else if(this.filter) {
      this.service.add(this.filter)
      .then(id => this.router.navigate(['/app/filters', id]))
      .catch(() => alert('Something went wrong... 2'));
    }
  }

  enableForm() {
    this.formEnabled = true;
  }

  disableForm() {
    this.formEnabled = false;
  }
}
