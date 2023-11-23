import { Injectable } from '@angular/core';
import { createPatient, updatePatientInfo } from '../models/patient'
import { createDentist, updateDentistInfo } from '../models/dentist';
import { createSupply } from '../models/supply';
import { createService } from '../models/service';
import { Capacitor, CapacitorHttp } from '@capacitor/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = Capacitor.getPlatform() == 'web' ? 'http://localhost:5000/api/' : 'http://192.168.210.70:5000/api/';
  private headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  }

  constructor(private router: Router, private datePipe: DatePipe) { }

  //  ! Login

  public login(obj: any) {

    const options = {
      url: this.baseUrl + 'login',
      headers: this.headers,
      data: {
        "email": obj.email,
        "password": obj.password
      },
    };
    return CapacitorHttp.post(options);
  }

  public logout() {

    localStorage.clear();
    this.router.navigate(['pages/login']);
  }

  public getMyInfo(path: string) {
    const options = {
      url: this.baseUrl + path + '/me',
      headers: this.headers,
    };
    return CapacitorHttp.get(options)
  }

  // ! Dentists

  public getDentists() {
    const options = {
      url: this.baseUrl + 'dentists',
      headers: this.headers,
    };

    return CapacitorHttp.get(options)
  }

  public getDentist(id: string) {
    const options = {
      url: this.baseUrl + 'dentists/' + id,
      headers: this.headers,
    };
    return CapacitorHttp.get(options);
  }

  public getDentistAppointments() {
    const options = {
      url: this.baseUrl + 'dentists/my/appointments',
      headers: this.headers,
    };
    return CapacitorHttp.get(options)
  }

  public getDentistRecords() {
    const options = {
      url: this.baseUrl + 'dentists/my/records',
      headers: this.headers,
    };
    return CapacitorHttp.get(options)
  }

  public insertDentist(obj: any, image: any) {
    const body = JSON.stringify(createDentist(obj, image));
    const options = {
      url: this.baseUrl + 'dentists',
      headers: this.headers,
      data: body
    };

    return CapacitorHttp.post(options)
  }

  public updateDentist(id: string, obj: any, image: any) {
    const options = {
      url: this.baseUrl + 'dentists/' + id,
      headers: this.headers,
      data: JSON.stringify(createDentist(obj, image))
    };
    return CapacitorHttp.put(options)
  }

  public updateDentistInfo(id: string, obj: any) {
    const body = JSON.stringify(updateDentistInfo(obj));
    const options = {
      url: this.baseUrl + 'dentists/me',
      headers: this.headers,
      data: body
    };
    return CapacitorHttp.put(options)
  }

  public deleteDentist(id: any) {
    const options = {
      url: this.baseUrl + 'dentists/' + id,
      headers: this.headers
    };
    return CapacitorHttp.delete(options)
  }

  // ! Patients

  public getPatients() {
    const options = {
      url: this.baseUrl + 'patients',
      headers: this.headers,
    };

    return CapacitorHttp.get(options)
  }

  public getPatient(id: string) {
    const options = {
      url: this.baseUrl + 'patients/' + id,
      headers: this.headers,
    };
    return CapacitorHttp.get(options)
  }
  
  public getPatientAppointments() {
    const options = {
      url: this.baseUrl + 'patients/my/appointments',
      headers: this.headers,
    };
    return CapacitorHttp.get(options)
  }
  public getPatientServices() {
    const options = {
      url: this.baseUrl + 'patients/my/sells',
      headers: this.headers,
    };
    return CapacitorHttp.get(options)
  }
  public getPatientRecords() {
    const options = {
      url: this.baseUrl + 'patients/my/records',
      headers: this.headers,
    };
    return CapacitorHttp.get(options)
  }

  public insertPatient(obj: any, image: any) {
    const body = JSON.stringify(createPatient(obj, image));
    const options = {
      url: this.baseUrl + 'patients',
      headers: this.headers,
      data: body
    };

    return CapacitorHttp.post(options)
  }

  public updatePatient(id: string, obj: any, image: any) {
    const body = JSON.stringify(createPatient(obj, image));
    const options = {
      url: this.baseUrl + 'patients/' + id,
      headers: this.headers,
      data: body
    };
    return CapacitorHttp.put(options)
  }
  
  public updatePatientInfo(obj: any, allergies: any[]) {
    const body = JSON.stringify(updatePatientInfo(obj, allergies));
    const options = {
      url: this.baseUrl + 'patients/me',
      headers: this.headers,
      data: body
    };
    console.log(options);
    
    return CapacitorHttp.put(options)
  }

  public deletePatient(id: any) {
    const options = {
      url: this.baseUrl + 'patients/' + id,
      headers: this.headers,
    };
    return CapacitorHttp.delete(options)
  }

  // ! Services

  public getServices() {
    const options = {
      url: this.baseUrl + 'services',
      headers: this.headers,
    };
    return CapacitorHttp.get(options)
  }

  public getService(id: string) {
    const options = {
      url: this.baseUrl + 'services/' + id,
      headers: this.headers,
    };
    return CapacitorHttp.get(options)
  }

  public insertService(obj: any, supplies: any[]) {
    const body = JSON.stringify(createService(obj, supplies));
    const options = {
      url: this.baseUrl + 'services',
      headers: this.headers,
      data: body
    };
    return CapacitorHttp.post(options)
  }

  public updateService(id: string, obj: any, supplies: any[]) {
    const body = JSON.stringify(createService(obj, supplies));
    const options = {
      url: this.baseUrl + 'services/' + id,
      headers: this.headers,
      data: body
    };

    return CapacitorHttp.put(options)
  }

  public deleteService(id: any) {
    const options = {
      url: this.baseUrl + 'services/' + id,
      headers: this.headers,
    };
    return CapacitorHttp.delete(options)
  }

  // ! Supplies

  public getSupplies() {
    const options = {
      url: this.baseUrl + 'supplies',
      headers: this.headers,
    };
    return CapacitorHttp.get(options)
  }

  public getSupply(id: string) {
    const options = {
      url: this.baseUrl + 'supplies/' + id,
      headers: this.headers,
    };
    return CapacitorHttp.get(options)
  }
  
  public getSupplyInventory(id: string) {
    const options = {
      url: this.baseUrl + 'supplies/' + id + '/inventory',
      headers: this.headers,
    };
    return CapacitorHttp.get(options)
  }

  public getSupplyBuys(id: string) {
    const options = {
      url: this.baseUrl + 'supplies/' + id + "/buys",
      headers: this.headers,
    };
    return CapacitorHttp.get(options)
  }
  public getSupplySells(id: string) {
    const options = {
      url: this.baseUrl + 'supplies/' + id + "/sells",
      headers: this.headers,
    };
    return CapacitorHttp.get(options)
  }

  public insertSupply(obj: any, image: any) {
    const body = JSON.stringify(createSupply(obj, image));
    const options = {
      url: this.baseUrl + 'supplies',
      headers: this.headers,
      data: body
    };
    return CapacitorHttp.post(options)
  }

  public buySupply(obj: any) {
    let body:any = null;

    if (obj.expiration_date !== null) {
      const tmp: Date = new Date(obj.expiration_date);
      obj.expiration_date = this.datePipe.transform(tmp, 'yyyy-MM-dd')
      body = JSON.stringify(obj);
    }else{
      body = JSON.stringify({supply_id: obj.supply_id, quantity: obj.quantity});
    }

    const options = {
      url: this.baseUrl + 'supplies/buys',
      headers: this.headers,
      data: body
    };
    console.log(body);

    return CapacitorHttp.post(options)
  }

  public updateSupply(id: string, obj: any, image: any) {
    const body = JSON.stringify(createSupply(obj, image));
    const options = {
      url: this.baseUrl + 'supplies/' + id,
      headers: this.headers,
      data: body
    };
    return CapacitorHttp.put(options)
  }

  public deleteSupply(id: any) {
    const options = {
      url: this.baseUrl + 'supplies/' + id,
      headers: this.headers,
    };
    return CapacitorHttp.delete(options)
  }

  // ! Appointments

  public getAppointments() {

    const options = {
      url: this.baseUrl + 'appointment/list',
      headers: this.headers
    };

    return CapacitorHttp.get(options)
  }

  public getMyAppointments(path: string) {
    const options = {
      url: this.baseUrl + path + '/my/appointments',
      headers: this.headers,
    };
    return CapacitorHttp.get(options)
  }

  public getAppointment(id: string) {
    const options = {
      url: this.baseUrl + 'appointment/' + id,
      headers: this.headers,
    };
    return CapacitorHttp.get(options)
  }

  public insertAppointment(obj: any) {

    const body = JSON.stringify(obj);
    console.log(body);

    const options = {
      url: this.baseUrl + 'appointment',
      headers: this.headers,
      data: body
    };

    return CapacitorHttp.post(options)
  }

  public updateAppointment(id: string, obj: any) {
    const body = JSON.stringify(obj);
    const options = {
      url: this.baseUrl + 'appointment/' + id,
      headers: this.headers,
      data: body
    };
    console.log(options);

    return CapacitorHttp.put(options)
  }

  public finishAppointment(id: any, services:any[], supplies:any[]) {
    const options = {
      url: this.baseUrl + 'appointment/' + id + '/finish',
      headers: this.headers,
      data: JSON.stringify({services: services, supplies: supplies})
    };
    console.log(JSON.stringify({services: services, supplies: supplies}));
    
    return CapacitorHttp.post(options)
  }
 
  public deleteAppointment(id: any) {
    const options = {
      url: this.baseUrl + 'appointment/' + id + '/finish',
      headers: this.headers,
    };
    return CapacitorHttp.delete(options)
  }

  // ! Taxes Regime

  public getTaxesRegime() {
    const options = {
      url: this.baseUrl + 'get/tax-regime',
      headers: this.headers,
    };
    return CapacitorHttp.get(options)
  }

  // ! Allergies

  public getAllergies() {
    const options = {
      url: this.baseUrl + 'get/allergies',
      headers: this.headers,
    };
    return CapacitorHttp.get(options)
  }


}
