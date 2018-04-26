import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { } from './public/public.module';
import { PageNotFoundComponent } from './not-found.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'app', loadChildren: './eliquavi/eliquavi.module#EliquaviModule' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}