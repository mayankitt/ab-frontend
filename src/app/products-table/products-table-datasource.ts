import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { RequestServerService } from '../request-server.service';

// TODO: Replace this with your own data model type
export interface ProductsTableItem {
  name: string;
  id?: string;
  description: string;
  category: string;
  units: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ProductsTableItem[] = [
  {
    id: 'P001',
    name: 'A320',
    description: 'A320 description',
    category: 'Commercial',
    units: 2
  },
  {
    id: 'P002',
    name: 'A380',
    description: 'A380 description',
    category: 'Commercial',
    units: 3
  },
  {
    id: 'P003',
    name: 'Sentinel',
    description: 'Sentinel description.',
    category: 'Space',
    units: 1
  },
  {
    id: 'P004',
    name: 'H135',
    description: 'H135 description',
    category: 'Helicopter',
    units: 2
  },
  {
    id: 'P005',
    name: 'H125',
    description: 'H125 description',
    category: 'Helicopter',
    units: 3
  }
];

/**
 * Data source for the ProductsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ProductsTableDataSource extends DataSource<ProductsTableItem> {
  data: ProductsTableItem[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor(private productsApi: RequestServerService) {
    super();
    this.productsApi.getProducts().subscribe((response: any) => {
      this.data = [];
      response.forEach((product: any) => {
        this.data.push({
          id: product.p_id,
          name: product.p_name,
          description: product.p_description,
          category: product.p_category,
          units: product.p_units
        });
      });
    });
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ProductsTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ProductsTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ProductsTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'description': return compare(a.name, b.name, isAsc);
        case 'category': return compare(a.category, b.category, isAsc);
        case 'units': return compare(a.units, b.units, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
