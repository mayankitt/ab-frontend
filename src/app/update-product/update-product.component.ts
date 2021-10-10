import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  productIds = [
    'P001',
    'P002'
  ];

  categories = [
    { name: 'Commercial', value: 'commercial' },
    { name: 'Helicopter', value: 'helicopter' },
    { name: 'Space', value: 'space' }
  ];

  nameCbIsChecked = false;
  descriptionCbIsChecked = false;
  categoryCbIsChecked = false;
  unitsCbIsChecked = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const inputFields = ['name', 'description', 'category', 'units'];
    inputFields.forEach(element => this.updateForm.get(element).disable());
  }

  onSubmit() {
    if (this.updateForm.valid) {
      alert('Thanks!');
    } else {
      alert('Unable to submit update data');
    }
  }

  changeInputControl(field: string, enable: boolean): void {
    const inputField = this.updateForm.get(field);
    enable ? inputField.enable() : inputField.disable();
  }
}
