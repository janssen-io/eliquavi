import { Component, OnInit } from '@angular/core';
import { EventEmitter } from 'protractor';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {
  private visible: boolean = false;
  private modal: { body: string, action: string};

  private modalEvent: Subject<boolean> = new Subject<boolean>();

  constructor() { 
    this.modal = {
      body: 'body',
      action: 'go'
    }
  }

  show(title: string, body: string, action: string = 'confirm'): Promise<void> {
    this.modal = { body: body, action: action }
    this.modalEvent = new Subject<boolean>();
    this.visible = true;
    
    console.log("LOG", this.modal);
    
    return new Promise<void>( (resolve, reject) => {
      console.log("LOG", "CREATED PROMISE");
      this.modalEvent.subscribe((data) => {
        this.modalEvent.complete();
        this.visible = false;
        if(data === true) {
          resolve();
        }
        else {
          reject();
        }
      });
    });
  }

  onCancel() {
    console.log("LOG", "CANCEL");
    this.modalEvent.next(false);
  }

  onConfirm() {
    console.log("LOG", "CONFIRM");
    this.modalEvent.next(true);
  }

}
