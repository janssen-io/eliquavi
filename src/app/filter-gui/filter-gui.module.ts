import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter/filter.component';
import { RuleComponent } from './rule/rule.component';
import { DisjunctionComponent } from './disjunction/disjunction.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  entryComponents: [
    RuleComponent,
    DisjunctionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CommonModule
  ],
  declarations: [FilterComponent, RuleComponent, DisjunctionComponent]
})
export class FilterGuiModule { }
