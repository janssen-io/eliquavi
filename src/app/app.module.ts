import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './not-found.component';
import { PublicModule } from './public/public.module';
import { AppRoutingModule } from './app-routing.module';
import { ConfirmModalComponent } from './layout/confirm-modal/confirm-modal.component';
import { LayoutModule } from './layout/layout.module';
import { FilterGuiModule } from './filter-gui/filter-gui.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    PublicModule,
    AppRoutingModule,
    FilterGuiModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
