import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CreateComponent } from './create/create.component';
import { ConditionComponent } from './create/condition.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    CreateComponent,
    ConditionComponent
  ]
})
export class FilterGuiModule { }
