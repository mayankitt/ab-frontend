import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { RequestServerService } from '../request-server.service';
import { ProductsTableDataSource, ProductsTableItem } from './products-table-datasource';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ProductsTableItem>;
  dataSource: ProductsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description', 'category', 'units'];
  categories = [
    { name: 'Commercial', value: 'COMMERCIAL' },
    { name: 'Helicopter', value: 'HELICOPTER' },
    { name: 'Space', value: 'SPACE' }
  ];
  selected: string;

  constructor(private productsApi: RequestServerService, private snackBar: MatSnackBar) {
    this.dataSource = new ProductsTableDataSource(this.productsApi);
    this.selected = null;
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  filterByCategory() {
    if (this.selected) {
      this.productsApi.getProductsByCategory(this.selected).subscribe(
        res => {
          this.dataSource.data = [];
          res.data.forEach(product => {
            const productForTable: ProductsTableItem = {
              id: product.p_id,
              name: product.p_name,
              category: product.p_category,
              description: product.p_description,
              units: product.p_units
            };
            this.dataSource.data.push(productForTable);
          });
          console.log(this.dataSource.data);
          this.table.dataSource = this.dataSource.data;
          this.table.renderRows();
          this.snackBar.open('Table showing data by category: ' + this.selected, 'Ok', {
            duration: 4000
          });
        },
        error => {
          this.snackBar.open('Data could not be retrieved from the server.', 'Ok', {
            duration: 3000
          });
        }
      );
    }
  }

  async reinitializeTable() {
    this.productsApi.getProducts().subscribe(
      res => {
        this.dataSource.data = [];
        res.data.forEach(product => {
            const productForTable: ProductsTableItem = {
              id: product.p_id,
              name: product.p_name,
              category: product.p_category,
              description: product.p_description,
              units: product.p_units
            };
            this.dataSource.data.push(productForTable);
          });
        console.log(this.dataSource.data);
        this.table.dataSource = this.dataSource.data;
        this.table.renderRows();
        this.snackBar.open('Fetched all products', 'Ok', {
            duration: 2000
        });
      },
      error => {
        this.snackBar.open('Data could not be retrieved from the server.', 'Ok', {
          duration: 3000
        });
      }
    );
    this.table.dataSource = this.dataSource.data;
    this.table.renderRows();
    this.snackBar.open('All products listed', 'Ok', {
      duration: 2500
    });
  }
}
