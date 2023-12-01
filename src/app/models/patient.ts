import { Person } from "./person";
import { User } from "./user";

export interface Patient {
  id?: string;
  person: Person;
  user: User;
  allergies: Allergy[];
}

export interface Allergy {
  id: number;
  name: string;
}

export function createPatient(obj: any, image: any) {
  const person: Person = {
    name: obj.name,
    surname: obj.surname,
    lastname: obj.lastname,
    birthday: obj.birthday,
    rfc: obj.rfc,
    tax_regime_id: obj.tax_regime_id,
    sex: obj.sex,
    address: obj.address,
    cp: obj.cp,
    latitude: "000",
    longitude: "000",
    phone: obj.phone
  };
  const user: User = {
    email: obj.email,
    password: obj.password,
    image: image== null ? '' : image
  };
  const allergies: Allergy[] =
    []
    ;

  const patient: Patient = {
    person: person,
    user: user,
    allergies: allergies,
  };
  return patient
}


export function updatePatientInfo(obj: any, allgies: any[]) {
  const person: Person = {
    name: obj.name,
    surname: obj.surname,
    lastname: obj.lastname,
    birthday: obj.birthday,
    rfc: obj.rfc,
    tax_regime_id: obj.tax_regime_id,
    sex: obj.sex,
    address: obj.address,
    cp: obj.cp,
    latitude: "000",
    longitude: "000",
    phone: obj.phone
  };
  const user: User = {
    email: obj.email,
  };
  const allergies: Allergy[] =
    allgies
    ;

  const patient: Patient = {
    person: person,
    user: user,
    allergies: allergies,
  };
  return patient
}