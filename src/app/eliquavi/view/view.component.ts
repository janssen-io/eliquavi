import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { Mutation, ITransaction } from '../models/transaction.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  private transaction: ITransaction;
  constructor(private service: TransactionService) { }

  ngOnInit() {
    this.service.add({
      Account: "",
      ContraAccount: "",
      Amount: 1,
      Date: new Date(),
      Description: "Testing...",
      Mutation: Mutation.Atm
    }).then(id => {
      return this.service.table.get(id);
    }).then(t => this.transaction = t)
    .then(() => this.service.remove(this.transaction.id));
  }
}
