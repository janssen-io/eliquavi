import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { EliquaviComponent } from './eliquavi.component';
import { ViewComponent } from './view/view.component';
import { CreatorComponent } from './creator/creator.component';
import { ImportComponent } from './import/import.component';
import { ExportComponent } from './export/export.component';

const eliquaviRoutes: Routes = [
  {
    path: '',
    component: ViewComponent
  },
  {
    path: 'filters',
    component: CreatorComponent
  },
  {
    path: 'filters/:id',
    component: CreatorComponent
  },
  {
    path: 'import',
    component: ImportComponent
  },
  {
    path: 'export',
    component: ExportComponent
  },
];

@NgModule({
  imports: [ RouterModule.forChild(eliquaviRoutes) ],
  exports: [
    RouterModule
  ]
})
export class EliquaviRoutingModule {}