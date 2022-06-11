import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-chanels-list',
  templateUrl: './chanels-list.component.html',
  styleUrls: ['./chanels-list.component.css'],
})
export class ChanelsListComponent implements OnInit {
  customers: Customer[];
  loading: Boolean;

  currentUserId: String;
  isRowEditable: Boolean = false;
  isButtonDisabled: Boolean = true;
  channelTypes: any[];
  constructor(
    private customerService: CustomerService,
    private messageService: MessageService,
    private confirmation: ConfirmationService
  ) {}

  ngOnInit() {
    this.customerService.getCustomersMedium().then((data) => {
      this.customers = data;
    });
    this.channelTypes = [
      { name: 'Single', value: 'Single' },
      { name: 'Vibration', value: 'vibration' },
    ];
  }

  calculateCustomerTotal(name) {
    let total = 0;

    if (this.customers) {
      for (let customer of this.customers) {
        if (customer.representative.name === name) {
          total++;
        }
      }
    }

    return total;
  }
  clear(table: Table) {
    table.clear();
    table.reset();
    table.filters = {};
    table.reset();
  }

  show(summary: String, details: String, severity: string) {
    this.messageService.add({
      severity,
      summary: summary + '!',
      detail: details + '',
    });
  }

  onRowEditInit(product: any) {
    this.isRowEditable = true;
  }

  onRowEditCancel(product: any, index: number, table: Table) {
    if (product.id > 0) {
    } else {
      table.value.splice(index, 1);
    }

    this.isRowEditable = false;
  }

  onRowEditSave(user: any, table: Table) {
    this.isRowEditable = false;
  }
}
