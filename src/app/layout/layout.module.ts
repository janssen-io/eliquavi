import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tab } from './tab/tab.component';
import { Tabs } from './tabs/tabs.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    Tab,
    Tabs,
    ConfirmModalComponent
  ],
  declarations: [
    Tab,
    Tabs,
    ConfirmModalComponent
  ]
})
export class LayoutModule { }
