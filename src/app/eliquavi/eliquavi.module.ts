import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MonacoEditorModule } from 'ngx-monaco-editor';

import { EliquaviRoutingModule } from './eliquavi-routing.module';
import { EliquaviComponent } from './eliquavi.component';

import { ViewComponent } from './view/view.component';
import { CreatorComponent } from './creator/creator.component';
import { ImportComponent } from './import/import.component';
import { ExportComponent } from './export/export.component';
import { FilterbarComponent } from './filterbar/filterbar.component';

import { TransactionService } from './services/transaction.service';
import { DexieService, DB_NAME } from './services/dexie.service';
import { FilterService } from './services/filter.service';
import { AppModule } from '../app.module';
import { ConfirmModalComponent } from '../layout/confirm-modal/confirm-modal.component';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EliquaviRoutingModule,
    MonacoEditorModule.forRoot(),
    LayoutModule
  ],
  declarations: [
    EliquaviComponent,
    ViewComponent,
    CreatorComponent,
    ImportComponent,
    ExportComponent,
    FilterbarComponent
  ],
  providers: [
    DexieService,
    TransactionService,
    FilterService,
    { provide: DB_NAME, useValue: 'EliquaviDb' }
  ]
})
export class EliquaviModule { }
