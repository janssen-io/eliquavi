import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { CreatorComponent } from './creator/creator.component';
import { ImportComponent } from './import/import.component';
import { ExportComponent } from './export/export.component';
import { EliquaviRoutingModule } from './eliquavi-routing.module';
import { EliquaviComponent } from './eliquavi.component';

@NgModule({
  imports: [
    CommonModule,
    EliquaviRoutingModule
  ],
  declarations: [EliquaviComponent, ViewComponent, CreatorComponent, ImportComponent, ExportComponent]
})
export class EliquaviModule { }
