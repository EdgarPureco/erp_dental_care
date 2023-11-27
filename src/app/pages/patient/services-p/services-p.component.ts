import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-services-p',
  templateUrl: './services-p.component.html',
  styleUrls: ['./services-p.component.scss'],
})
export class ServicesPComponent implements OnInit {

  constructor(private toastController: ToastController, private formBuilder: FormBuilder, private api: ApiService) {
  }

  data: any[] = [];
  results: any[] = [];
  supplies: any[] = [];
  suppliesAdded: any[] = [];
  service: any = null

  modalDetails = false

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.api.getPatientServices().then((response:any) => { 
      this.data = response.data;
      this.results = [...this.data]
     });
  }


  openDetails(id: any) {

    this.modalDetails = true

    this.api.getService(id).then((response:any) => {
      this.service = response.data;
    })
  }
  onWillDismiss() {
    this.modalDetails = false
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

async presentToast() {
  const toast = await this.toastController.create({
    message: 'Éxito !!',
    duration: 1500,
    position: 'top',
    color: 'success'
  });

  await toast.present();
}

search(event:any) {
  const query = event.target.value.toLowerCase();
  
  if (query==='' || query===null) {
    this.results = [...this.data]
  }else{
    this.results = this.data.filter((d) => {
      const person = d.person;
      const fullName = `${person.name} ${person.lastname} ${person.surname}`.toLowerCase();
      return fullName.includes(query.toLowerCase());
    });
  }
}

}
