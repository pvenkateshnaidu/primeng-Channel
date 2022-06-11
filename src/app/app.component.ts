import { Component, OnInit, Input } from '@angular/core';
import { Product } from './product';
import { ProductService } from './productservice';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  statuses: SelectItem[];
  loading: Boolean;

  currentUserId: String;
  isRowEditable: Boolean = false;
  isButtonDisabled: Boolean = true;
  isSaveDisabled: Boolean = true;
  products: any[];
  channelTypes: any[];
  enginelayouts: any[];
  enginetypes: any[];
  relaventtypes: any[];
  dltypes: any[];
  dltype: any;
  relaventtype: any;
  enginelayout: any;
  enginetype: any;
  groupname: string = '';

  directionTypes: any[];
  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmation: ConfirmationService
  ) {}

  ngOnInit() {
    this.isButtonDisabled = true;
    this.currentUserId = sessionStorage.getItem('userId');
    this.getTableData();
    this.channelTypes = [
      { name: 'Single', value: 'Single' },
      { name: 'Vibration', value: 'vibration' },
    ];
    this.dltypes = [
      { name: 'All', value: 'All' },
      { name: 'PPD', value: 'PPD' },
    ];
    this.enginelayouts = [
      { name: 'All', value: 'All' },
      { name: 'Tacho', value: 'NY' },
    ];
    this.enginetypes = [
      { name: 'All', value: 'All' },
      { name: 'NS42', value: 'NY' },
    ];
    this.relaventtypes = [
      { name: 'All', value: 'All' },
      { name: 'PPM', value: 'NY' },
    ];
    this.directionTypes = [
      { name: 'X', value: 'X' },
      { name: 'Y', value: 'Y' },
      { name: 'Z', value: 'Z' },
    ];
  }
  onChange(event) {
    console.log(this.groupname.length);
    if (
      this.groupname.length > 2 &&
      this.dltype &&
      this.enginelayout &&
      this.enginetype &&
      this.relaventtype
    ) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
  }
  getTableData() {
    this.loading = true;
    this.productService.getProducts().then((data) => {
      this.products = data;
      this.loading = false;
      this.isRowEditable = false;
    });
  }

  clear(table: Table) {
    table.clear();
    table.reset();
    table.filters = {};
    table.reset();
  }

  newRow() {
    return {
      id: 0,
      name: '',
      channelType: '',
      channelDescription: '',
      direction: '',
    };
  }

  newRowAdd(table: Table) {
    this.isRowEditable = true;
    this.clear(table);
    this.isSaveDisabled = true;
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
    this.isSaveDisabled = false;
  }

  onRowEditSave(user: any, table: Table) {
    this.isRowEditable = false;
    this.isSaveDisabled = false;
  }

  private onRowDeleteInit(event: Event, id: any, cdsid: string) {
    this.products = this.products.filter((x) => x.id !== id);
    /* this.confirmation.confirm({
      target: event.target,
      message:
        'Are you sure that you want to delete user with cdsid  ' +
        cdsid.toUpperCase() +
        ' ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService
          .delete(id)
          .pipe(first())
          .subscribe(() => {
            this.users = this.users.filter((x) => x.userAccessId !== id);
            this.loading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User Deleted Successfully',
            });
            this.isRowEditable = false;
          });
      },
      reject: () => {
         
      },
    }); */
  }
}
