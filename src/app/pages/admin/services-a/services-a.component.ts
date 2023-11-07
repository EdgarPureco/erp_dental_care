import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { SuppliesAComponent } from '../supplies-a/supplies-a.component';


@Component({
  selector: 'app-services-a',
  templateUrl: './services-a.component.html',
  styleUrls: ['./services-a.component.scss'],
})
export class ServicesAComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private api: ApiService) {
  }

  data: any[] = [];
  supplies: any[] = [];
  suppliesAdded: any[] = [];
  service: any = null

  serviceForm = this.formBuilder.group({
    name: null,
    price: null,
    supplies: null

  });

  serviceEditForm = this.formBuilder.group({
    name: null,
    price: null,
    supplies: null
  });

  modalAdd = false
  modalDetails = false
  modalEdit = false
  modalDelete = false

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.api.getServices().then((response:any) => { this.data = response.data });
    this.api.getSupplies().then((response:any) => { this.supplies = response.data });
  }

  openAdd() {
    this.modalAdd = true
  }

  handleChange(e: any) {
    this.suppliesAdded.push(
      { "supply_id": parseInt(e.detail.value), 
      "quantity": 1, 
      "name": this.supplies[this.findIndexById(e.detail.value)].name 
    });
  }

  addQuantity(e: any, id: number) {
    this.suppliesAdded.map(item => {
      if (item.supply_id === id) {
        item.quantity = parseInt(e.detail.value)
        return item;
      } else {
        return item;
      }
    });
  }

  removeSupply(id: any) {
    this.suppliesAdded = this.suppliesAdded.filter((item) => item.id !== id);
  }

  onSubmit() {

    this.api.insertService(this.serviceForm.value, this.suppliesAdded).then(
      (response:any) => {
        this.modalAdd = false
        this.serviceForm.reset();
        this.getData()
      }
    );
  }

  onWillDismiss() {
    this.modalAdd = false
    this.modalDetails = false
    this.modalEdit = false
    this.modalDelete = false
    this.suppliesAdded = []
  }



  openDetails(id: any) {

    this.modalDetails = true

    this.api.getService(id).then((response:any) => {
      this.service = response.data;
    })
  }

  openEdit(id: any) {
    this.modalEdit = true
    this.api.getService(id).then((response:any) => {

      this.service = response.data
      console.log(response.data.supplies);
      
      response.data.supplies.forEach((item: any) => {
        console.log(item);
        
        this.suppliesAdded.push({ "supply_id": item.supply.id, "quantity": item.quantity })
      });
      console.log(this.suppliesAdded);
      
    })

  }

  onSubmitEdit() {
    console.log(this.suppliesAdded);

    this.api.updateService(this.service.id, this.serviceEditForm.value, this.suppliesAdded).then(
      (response:any) => {
        this.service = null
        this.modalEdit = false
        this.getData();
      }
    );
    this.serviceEditForm.reset();
  }

  openDelete(id: any) {
    this.modalDelete = true
    this.api.getService(id).then((response:any) => {
      this.service = response.data
    })
  }


  deleteService() {
    this.api.deleteService(this.service.id).then(
      (response:any) => {
        this.modalDelete = false
        this.getData();
      }
    )
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.supplies.length; i++) {
      if (this.supplies[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

   itemExists(id: number): boolean {
    if(this.suppliesAdded.some(item => item.supply_id === id)){
      return false
    }
    return true
}
}
