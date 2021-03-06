import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsTableItem } from '../products-table/products-table-datasource';
import { RequestServerService } from '../request-server.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  updateForm = this.fb.group({
    id: [null, Validators.required],
    name: null,
    description: null,
    category: null,
    units: null
  });

  products: ProductsTableItem[];
  selectedProduct: ProductsTableItem;
  selected: any;

  categories = [
    { name: 'Commercial', value: 'COMMERCIAL' },
    { name: 'Helicopter', value: 'HELICOPTER' },
    { name: 'Space', value: 'SPACE' }
  ];

  nameCbIsChecked = false;
  descriptionCbIsChecked = false;
  categoryCbIsChecked = false;
  unitsCbIsChecked = false;

  constructor(private fb: FormBuilder,
              private productsApi: RequestServerService,
              private snackBar: MatSnackBar) {}

  ngOnInit() {
    const inputFields = ['name', 'description', 'category', 'units'];
    inputFields.forEach(element => this.updateForm.get(element).disable());
    this.productsApi.getProducts().subscribe((response: any) => {
      this.products = [];
      response.data.forEach((product: any) => {
        this.products.push({
          id: product.p_id,
          name: product.p_name,
          description: product.p_description,
          category: product.p_category,
          units: product.p_units
        });
      });
    });
    this.selectedProduct = {
      id: null,
      name: null,
      description: null,
      category: null,
      units: null
    };
    this.selected = null;
  }

  onSubmit() {
    if (this.updateForm.valid) {
      const requestBody: ProductsTableItem = {
        name: this.updateForm.get('name').value,
        id: this.updateForm.get('id').value,
        description: this.updateForm.get('description').value,
        category: this.updateForm.get('category').value,
        units: this.updateForm.get('units').value
      };
      this.productsApi.updateProduct(requestBody).subscribe(resp => {
        console.log(resp);
        this.snackBar.open('Product updated successfully', 'Ok', {
          duration: 3000
        });
      }, error => {
        console.error(error);
        let messageToShow = 'Product could not be updated.';
        if (error.message) {
          messageToShow += error.message;
        }
        this.snackBar.open(messageToShow, 'Ok', {
          duration: 4000
        });
      });
    } else {
      alert('Unable to submit update data');
    }
  }

  getProductObject(id: string): ProductsTableItem {
    if (id === null || id === '') {
      return {
        id: '',
        name: '',
        description: '',
        category: '',
        units: 0
      };
    }
    return this.products.find(product => product.id === id);
  }

  changeInputControl(field: string, enable: boolean): void {
    const inputField = this.updateForm.get(field);
    enable ? inputField.enable() : inputField.disable();
  }

  deleteProduct() {
    if (this.selected) {
      this.productsApi.deleteProduct(this.selected).subscribe(resp => {
        console.log(resp);
        this.snackBar.open(resp.message, 'Ok', {
          duration: 3000
        });
      }, error => {
        console.error(error);
        this.snackBar.open(error.message, 'Ok', {
          duration: 5000
        });
      });
    }
  }
}
