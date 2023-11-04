import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Allergy, Patient, createPatient } from '../models/patient'
import { createDentist } from '../models/dentist';
import { createSupply } from '../models/supply';
import { createService } from '../models/service';
import { Capacitor, CapacitorHttp } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = Capacitor.getPlatform()== 'web' ? 'http://localhost:5000/api/' : 'http://192.168.200.23:5000/api/';
  private headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  }

  constructor() { }

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

  public insertDentist(obj: any) {
    const body = JSON.stringify(createDentist(obj));
    const options = {
      url: this.baseUrl + 'dentists',
      headers: this.headers,
      data: body
    };

    return CapacitorHttp.post(options)
  }

  public updateDentist(id: string, obj: any) {
    const body = JSON.stringify(createDentist(obj));
    const options = {
      url: this.baseUrl + 'dentists/'+id,
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

  public insertPatient(obj: any) {
    const body = JSON.stringify(createPatient(obj));
    const options = {
      url: this.baseUrl + 'patients',
      headers: this.headers,
      data: body
    };

    return CapacitorHttp.post(options)
  }

  public updatePatient(id: string, obj: any) {
    const body = JSON.stringify(createPatient(obj));
    const options = {
      url: this.baseUrl + 'patients/' + id,
      headers: this.headers,
      data: body
    };
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
    return CapacitorHttp.get( options)
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

  public insertSupply(obj: any) {
    const body = JSON.stringify(createSupply(obj));
    const options = {
      url: this.baseUrl + 'supplies',
      headers: this.headers,
      data: body
    };
    return CapacitorHttp.post(options)
  }

  public updateSupply(id: string, obj: any) {
    const body = JSON.stringify(createSupply(obj));
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

    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(today.getMonth() + 1);

    const body = {
      dentist_id: 1,
      patient_id: 1,
      start_date: today.toISOString(),
      end_date: nextMonth.toISOString()
    };

    const options = {
      url: this.baseUrl + 'appointment/list',
      headers: this.headers,
      data: body
    };

    return CapacitorHttp.post(options)
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
    return CapacitorHttp.put(options)
  }

  public deleteAppointment(id: any) {
    const options = {
      url: this.baseUrl + 'appointment/' + id,
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
  
  // ! Frequencies
  
  public getFrequencies() {
    const options = {
      url: this.baseUrl + 'get/frequencies',
      headers: this.headers,
    };
    return CapacitorHttp.get(options)
  }

  // ! Week days

  public getWeekDays() {
    const options = {
      url: this.baseUrl + 'get/weekdays',
      headers: this.headers,
    };
    return CapacitorHttp.get(options)
  }

}
