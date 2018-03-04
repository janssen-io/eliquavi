import { Component } from '@angular/core';
import { Tab } from '../tab/tab.component'

@Component({
  selector: 'tabs',
  template: `
    <div class="tabs">
      <ul>
        <li *ngFor="let tab of tabs" (click)="select(tab)">
          <a>{{tab.title}}</a>
        </li>
      </ul>
    </div>
    <ng-content></ng-content>
  `
})
export class Tabs {
  tabs: Tab[] = [];

  add(tab: Tab) {
    if(this.tabs.length == 0) {
      tab.show(); 
    }
    this.tabs.push(tab);
  }

  select(tab: Tab) {
    this.tabs.forEach(tab => tab.hide());
    tab.show();
  }
}
