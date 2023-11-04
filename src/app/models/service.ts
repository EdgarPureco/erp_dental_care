import { Supply } from "./supply";

export interface Service {
    name: string;
    price: number;
    supplies: Supply[];
  }
  
  export function createService(obj:any, supplies:any[]){
    let service: Service = {
      name: obj.name,
      price: obj.price,
      supplies: supplies
  };
    return service;
  }