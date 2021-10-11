import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsTableItem } from '../products-table/products-table-datasource';
import { RequestServerService } from '../request-server.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  createForm = this.fb.group({
    name: [null, Validators.required],
    description: [null, Validators.required],
    category: [null, Validators.required],
    units: [null, Validators.required],
  });

  categories = [
    { name: 'Commercial', value: 'COMMERCIAL' },
    { name: 'Helicopter', value: 'HELICOPTER' },
    { name: 'Space', value: 'SPACE' }
  ];

  constructor(private fb: FormBuilder,
              private productsApi: RequestServerService,
              private router: Router) {}

  ngOnInit() {
  }

  onSubmit() {
    if (this.createForm.valid) {
      const requestBody: ProductsTableItem = {
        name: this.createForm.get('name').value,
        description: this.createForm.get('description').value,
        category: this.createForm.get('category').value,
        units: this.createForm.get('units').value
      };
      this.productsApi.createProduct(requestBody).subscribe(resp => {
        console.log(resp);
        alert('Product created successfully.');
      }, error => {
        console.error(error);
        alert('Product could not be created');
      });
    } else {
      alert('Unable to submit create data');
    }
  }

  changeInputControl(field: string, enable: boolean): void {
    const inputField = this.createForm.get(field);
    enable ? inputField.enable() : inputField.disable();
  }
}
