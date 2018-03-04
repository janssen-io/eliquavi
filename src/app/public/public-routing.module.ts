import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DocumentationComponent } from './documentation/documentation.component';

const publicRoutes: Routes = [
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'documentation',
      component: DocumentationComponent
    }
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(
      publicRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class PublicRoutingModule {}