import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { SuppliesAComponent } from '../supplies-a/supplies-a.component';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-services-a',
  templateUrl: './services-a.component.html',
  styleUrls: ['./services-a.component.scss'],
})
export class ServicesAComponent implements OnInit {

  constructor(private toastController: ToastController, private formBuilder: FormBuilder, private api: ApiService) {
  }

  data: any[] = [];
  loading: boolean = false;
  results: any[] = [];
  supplies: any[] = [];
  suppliesAdded: any[] = [];
  suppliesActives: any[] = [];
  service: any = null

  serviceForm = this.formBuilder.group({
    name: [null, [Validators.required]],
    price: [null, [Validators.required]],
    supplies: null
  });

  serviceEditForm = this.formBuilder.group({
    name: [null, [Validators.required]],
    price: [null, [Validators.required]],
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
    this.loading = true
    this.api.getServices('all').then((response:any) => { 
      this.data = response.data;
      this.results = [...this.data]
      this.loading = false
     });
    this.api.getSupplies('activo').then((response:any) => { this.suppliesActives = response.data });
  }

  openAdd() {
    this.modalAdd = true
  }

  handleChange(e: any) {
    this.suppliesAdded.push(
      { "supply_id": parseInt(e.detail.value), 
      "quantity": 1, 
      "name": this.suppliesActives[this.findIndexByIdActives(e.detail.value)].name 
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
    this.loading = true
    this.api.insertService(this.serviceForm.value, this.suppliesAdded).then(
      (response: any) => {
        if(response.status==400){
          this.presentToast('Error: Ya existe este registro', 'danger')
        }else{
          this.presentToast('Éxito: Servicio registrado', 'success')
          this.serviceForm.reset();
        }
        this.getData()
        this.modalAdd = false
        this.loading = false
      },(e) => {
        this.presentToast('Error en el Servidor, ', 'danger')
        this.loading = false
        console.log('Error', e);
      }
    );
  }

  onWillDismiss() {
    this.loading = false
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
    this.api.getSupplies('all').then((response:any) => { this.supplies = response.data });
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
    this.loading = true

    this.api.updateService(this.service.id, this.serviceEditForm.value, this.suppliesAdded).then(
      (response: any) => {
        if(response.status==400){
          this.presentToast('Error: Ya existe este registro', 'danger')
        }else{
          this.presentToast('Éxito: Servicio actualizado', 'success')
        }
        this.service = null
        this.getData();
        this.modalEdit = false
        this.loading = false
      },(e) => {
        this.presentToast('Error en el Servidor, ', 'danger')
        this.loading = false
        console.log('Error', e);
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
    this.loading = true
    this.api.deleteService(this.service.id).then(
      (response:any) => {
        if(response.status===200){
          this.presentToast('Éxito: Servicio eliminado', 'success')
        }else{
          this.presentToast('Error', 'danger')
        }
        this.modalDelete = false
        this.loading = false
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
  
  findIndexByIdActives(id: string): number {
    let index = -1;
    for (let i = 0; i < this.suppliesActives.length; i++) {
      if (this.suppliesActives[i].id === id) {
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

async presentToast(message:string, type:string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 1500,
    position: 'top',
    color: type
  });

  await toast.present();
}

search(event:any) {
  const query = event.target.value.toLowerCase();
  
  if (query==='' || query===null) {
    this.results = [...this.data]
  }else{
    this.results = this.data.filter((d) => {
      const fullName = d.name.toLowerCase();
      return fullName.includes(query.toLowerCase());
    });
  }
}

filter($e:any){
  this.api.getServices($e.detail.value).then((response: any) => {
    this.data = response.data;
    this.results = [...this.data]
    
  },(e) => {
    this.presentToast('Error en el Servidor, ', 'danger')
    this.loading = false
    console.log('Error', e);
  });
}

}
