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

  private modalEvent: Subject<boolean>;

  constructor() { 
    this.modal = {
      body: 'body',
      action: 'go'
    }
  }

  show(body: string, action: string = 'confirm'): Promise<void> {
    this.modal = { body: body, action: action }
    this.modalEvent = new Subject<boolean>();
    this.visible = true;
    
    return new Promise<void>( (resolve, reject) => {
      this.modalEvent.subscribe((data) => {
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
    this.modalEvent.next(false);
  }

  onConfirm() {
    this.modalEvent.next(true);
  }

}
