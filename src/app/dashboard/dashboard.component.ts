import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { DatePipe } from '@angular/common';

export class UserData {
  orderid: number;
  Customerid: number;
  deliveryPincode: string;
  orderDate: string;
  items: string;
  constructor(
    orderid: number,
    Customerid: number,
    deliveryPincode: string,
    orderDate: string,
    items: string
  ) {
    this.orderid = orderid;
    this.Customerid = Customerid;
    this.deliveryPincode = deliveryPincode;
    this.orderDate = orderDate;
    this.items = items;
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  userArray: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private http: HttpClient, public datepipe: DatePipe) {
      this.http.get('assets/SeedData.csv', {responseType: 'text'}).subscribe(
        data => {
          const csvToRowArray = data.split('\n');
          const t = new Array(csvToRowArray.length - 1);
          for (let index = 1; index <= csvToRowArray.length - 1; index++) {
            const row = csvToRowArray[index].split(',');
            const timestamp = Date.parse(row[3]);
            let k = 'Null';
            if (isNaN(timestamp) === false) {
            const m = new Date(row[3]);
            k = this.datepipe.transform(m, 'dd/MM/yyyy');
            }
            t[index - 1] = new UserData(
              parseInt(row[0], 10),
              parseInt(row[1], 10),
              row[2],
              k,
              row[4]
            );
          }
          this.userArray = new MatTableDataSource(t);
          this.userArray.paginator = this.paginator;
          this.userArray.sort = this.sort;
        },
        error => {
          console.log(error);
      }
      );
      // this.userArray = new MatTableDataSource();
     }
  displayedColumns: string[] = ['orderid', 'Customerid', 'deliveryPincode', 'orderDate', 'items'];

  ngOnInit(): void {
  }
  applyFilterPincode(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userArray.filterPredicate = (data, filter) =>
      (data.deliveryPincode.indexOf(filter) !== -1);
    this.userArray.filter = filterValue.trim().toLowerCase();
    if (this.userArray.paginator) {
      this.userArray.paginator.firstPage();
    }
  }
  applyFilterDate(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userArray.filterPredicate = (data, filter) =>
      (data.orderDate.indexOf(filter) !== -1);
    this.userArray.filter = filterValue.trim().toLowerCase();
    if (this.userArray.paginator) {
      this.userArray.paginator.firstPage();
    }
  }
}
