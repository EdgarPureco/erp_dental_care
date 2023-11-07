import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CheckboxCustomEvent } from '@ionic/angular';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-supplies-a',
  templateUrl: './supplies-a.component.html',
  styleUrls: ['./supplies-a.component.scss'],
})
export class SuppliesAComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private api: ApiService) {
  }

  data: any[] = [];
  supply: any = null

  supplyForm = this.formBuilder.group({
    name: null,
    cost: null,
    price: null,
    is_salable: null,
    buy_unit: null,
    use_unit: null,
    equivalence: null,
    image: null
  });

  supplyEditForm = this.formBuilder.group({
    name: null,
    cost: null,
    price: null,
    is_salable: null,
    buy_unit: null,
    use_unit: null,
    equivalence: null,
    image: null
  });

  modalAdd = false
  modalDetails = false
  modalEdit = false
  modalDelete = false

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.api.getSupplies().then((response:any) => { this.data = response.data });
  }

  openAdd() {
    this.modalAdd = true
  }

  onSubmit() {
 
    this.api.insertSupply(this.supplyForm.value).then(
      (response:any) => {
        this.modalAdd = false
        this.supplyForm.reset();
        this.getData()
      }
    );
  }

  onWillDismiss() {
    this.modalAdd = false
    this.modalDetails = false
    this.modalEdit = false
    this.modalDelete = false
  }

  onSubmitEdit() {
    console.log(this.supplyEditForm.value);
    
    this.api.updateSupply(this.supply.id, this.supplyEditForm.value).then(
      (response:any) => { 
        this.supply = null
        this.modalEdit = false
        this.getData();
      }
    );
    this.supplyEditForm.reset();
  }

  openDetails(id: any) {

    this.modalDetails = true

    this.api.getSupply(id).then((response:any) => {
      this.supply = response.data;
    })
  }

  openEdit(id: any) {
    this.modalEdit = true
    this.api.getSupply(id).then((response:any) => {
      this.supply = response.data
      this.supplyEditForm.value.is_salable = this.supply.is_salable
      this.supplyEditForm.value.equivalence = this.supply.equivalence
    })
    
  }

  openDelete(id: any) {
    this.modalDelete = true
    this.api.getSupply(id).then((response:any) => {
      this.supply = response.data
    })
  }


  deleteSupply() {
    this.api.deleteSupply(this.supply.id).then(
      (response:any) => {
        this.modalDelete = false
        this.getData();
      }
    )
  }




  // Secondary Functions

  readonly phoneMask: MaskitoOptions = {
    mask: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  };

  readonly cardMask: MaskitoOptions = {
    mask: [
      ...Array(3).fill(/\d/),
      ' ',
      ...Array(3).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
    ],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();


}
