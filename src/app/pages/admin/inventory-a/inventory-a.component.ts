import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-inventory-a',
  templateUrl: './inventory-a.component.html',
  styleUrls: ['./inventory-a.component.scss'],
})
export class InventoryAComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private api: ApiService) {
  }

  data: any[] = [];
  buys: any[] = [];
  sells: any[] = [];
  supply: any = null

  supplyForm = this.formBuilder.group({
    supply_id: 0,
    quantity: null,
    expiration_date: null,
    
  });


  modalAdd = false
  modalDetails = false
  modalBuys = false
  modalSells = false

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.api.getSupplies().then((response:any) => { this.data = response.data, console.log(response.data);
     });
  }

  openAdd(id:number) {
    this.modalAdd = true
    this.supplyForm.value.supply_id = id
  }

  onSubmit() {
 
    this.api.buySupply(this.supplyForm.value).then(
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
  }


  openDetails(id: any) {

    this.modalDetails = true

    this.api.getSupply(id).then((response:any) => {
      this.supply = response.data;
    })
  }

  openBuys(id: any) {

    this.modalBuys = true

    this.api.getSupplyBuys(id).then((response:any) => {
      this.buys = response.data;
    })
  }
  openSells(id: any) {

    this.modalSells = true

    this.api.getSupplySells(id).then((response:any) => {
      this.sells = response.data;
    })
  }



}
