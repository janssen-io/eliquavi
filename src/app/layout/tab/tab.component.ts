import { Component, OnInit, Input } from '@angular/core';
import { Tabs } from '../tabs/tabs.component'

@Component({
  selector: 'tab',
  template: `
    <div class="tab-content" [hidden]="!active">
      <ng-content></ng-content>
    </div>
  `
})
export class Tab implements OnInit {

  @Input() title: string;
  private active: Boolean = false;
  private parent: Tabs;

  
  constructor(tabs: Tabs) {
    this.parent = tabs; 
  }

  ngOnInit() { 
    this.parent.add(this);
  }

  show() {
    this.active = true;
  }

  hide() {
    this.active = false;
  }

  isShown(): Boolean {
    return this.active;
  }
}
