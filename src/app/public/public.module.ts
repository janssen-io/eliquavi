import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationComponent } from './documentation/documentation.component';
import { HomeComponent } from './home/home.component';
import { PublicRoutingModule } from './public-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule
  ],
  exports: [
    DocumentationComponent,
    HomeComponent
  ],
  declarations: [DocumentationComponent, HomeComponent]
})
export class PublicModule { }
