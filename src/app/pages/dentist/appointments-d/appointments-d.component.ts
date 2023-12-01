import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CheckboxCustomEvent, ToastController } from '@ionic/angular';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-appointments-d',
  templateUrl: './appointments-d.component.html',
  styleUrls: ['./appointments-d.component.scss'],
})
export class AppointmentsDComponent implements OnInit {


  constructor(private toastController: ToastController, private formBuilder: FormBuilder, private api: ApiService) {
    let fechaActual = new Date();

    fechaActual.setFullYear(fechaActual.getFullYear() - 5);


  }

  data: any[] = [];
  loading: boolean = false;
  results: any[] = [];
  patients: any[] = [];
  dentists: any[] = [];
  supplies: any[] = [];
  suppliesAdded: any[] = [];
  services: any[] = [];
  servicesAdded: any[] = [];
  finish: any = null
  appointment: any = null

  appointmentForm = this.formBuilder.group({
    dentist_id: [null, [Validators.required]],
    patient_id: [null, [Validators.required]],
    start_date: [null, [Validators.required]],
    end_date: [null, [Validators.required]],

  });

  appointmentEditForm = this.formBuilder.group({
    dentist_id: [null, [Validators.required]],
    patient_id: [null, [Validators.required]],
    start_date: [null, [Validators.required]],
    end_date: [null, [Validators.required]],
  });


  modalDetails = false
  modalFinish = false
  maxPL = 6

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true
    this.api.getMyAppointments('dentists').then((response: any) => {
      response.data.map((item: any) => {
        if (item.status==='AGENDADA'){
          this.data.push(item)
        }
      })
      this.results = [...this.data]
      console.log(this.data);
      
      this.loading = false
    },(e) => {
      this.presentToast('Error en el Servidor, ', 'danger')
      this.loading = false
      console.log('Error', e);
    });
  }


  onWillDismiss() {
    this.loading = false
    this.modalDetails = false
    this.modalFinish = false
  }


  openDetails(id: any) {

    this.modalDetails = true
    this.appointment = this.data[this.findIndexByIdAppointments(id)]
  }

  openFinish(id: any) {
    this.modalFinish = true
    this.appointment = this.data[this.findIndexByIdAppointments(id)]
    this.api.getServices('activo').then((response: any) => {
      this.services = response.data
    },(e) => {
      this.presentToast('Error en el Servidor, ', 'danger')
      this.loading = false
      console.log('Error', e);
    })
    this.api.getSupplies('activo').then((response: any) => {
      response.data.map((item: any) => {
        if (item.stock>0) {
          this.supplies.push(item)
        }
      })

    },(e) => {
      this.presentToast('Error en el Servidor, ', 'danger')
      this.loading = false
      console.log('Error', e);
    })
  }


  finishAppointment() {
    this.loading = true
    this.api.finishAppointment(this.appointment.id, this.servicesAdded, this.suppliesAdded).then(
      (response: any) => {
        if(response.status===200){
          this.presentToast('Éxito: Cita finalizada', 'success')
        }else{
          this.presentToast('Error', 'danger')
        }
        this.modalFinish = false
        this.getData();
        this.loading = false
      },(e) => {
        this.presentToast('Error en el Servidor, ', 'danger')
        this.loading = false
        console.log('Error', e);
      }
    );
  }


  findIndexByIdAppointments(id: string): number {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  findIndexByIdServices(id: string): number {
    let index = -1;
    for (let i = 0; i < this.services.length; i++) {
      if (this.services[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  handleChangeSupplies(e: any) {
    this.suppliesAdded.push(
      {
        "supply_id": parseInt(e.detail.value),
        "quantity": 1
      });
  }

  handleChangeServices(e: any) {
    this.servicesAdded.push(
      {
        "service_id": parseInt(e.detail.value),
        "quantity": 1
      });
  }

  serviceExists(id: number): boolean {
    if (this.servicesAdded.some(item => item.service_id === id)) {
      return false
    }
    return true
  }

  findIndexByIdSupplies(id: string): number {
    let index = -1;
    for (let i = 0; i < this.supplies.length; i++) {
      if (this.supplies[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  supplyExists(id: number): boolean {
    if (this.suppliesAdded.some(item => item.supply_id === id)) {
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


  addQuantitySupplies(e: any, id: number) {
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

  addQuantityServices(e: any, id: number) {
    this.servicesAdded.map(item => {
      if (item.service_id === id) {
        item.quantity = parseInt(e.detail.value)
        return item;
      } else {
        return item;
      }
    });
  }

  removeService(id: any) {
    this.servicesAdded = this.servicesAdded.filter((item) => item.id !== id);
  }


  search(event: any) {
    const query = event.target.value.toLowerCase();
    console.log(this.results);

    if (query === '' || query === null) {
      this.results = [...this.data]
    } else {
      this.results = this.data.filter((d) => {
        const patient = d.patient.person;
        const fullName = `${patient.name} ${patient.surname} ${patient.lastname}`.toLowerCase();
        return fullName.includes(query.toLowerCase());
      });
    }
  }

  filter($e: any) {
    this.api.getAppointments($e.detail.value).then((response: any) => {
      this.data = response.data;
      this.results = [...this.data]

    },(e) => {
      this.presentToast('Error en el Servidor, ', 'danger')
      this.loading = false
      console.log('Error', e);
    });
  }


  // Secondary Functions

  formatDateToLetter(date: any) {
    var startDate = new Date(date);

    const formattedDate = new Intl.DateTimeFormat('es-ES', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }).format(startDate);

    return formattedDate;
  }

  formatDateToNumbers(date: any) {
    var startDate = new Date(date);

    const formattedDate = new Intl.DateTimeFormat('es-ES', { hour: 'numeric', minute: 'numeric', weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }).format(startDate);

    return formattedDate;
  }

}
