import { Person } from "./person";
import { User } from "./user";

export interface Dentist {
  person: Person;
  user: User;
  professional_license: string;
  hired_at: string;
  position: string;
  diplomas: Diploma[];
}
export interface Diploma {
  name: string;
  university: string;
}

export function createDentist(obj: any, image: any) {

  const person: Person = {
    name: obj.name,
    surname: obj.surname,
    lastname: obj.lastname,
    birthday: obj.birthday,
    rfc: obj.rfc,
    tax_regime_id: 1,
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
    image: image
  };
  const diplomas: Diploma[] = [];

  const dentist: Dentist = {
    person: person,
    user: user,
    professional_license: obj.professional_license,
    hired_at: obj.hired_at,
    position: obj.position,
    diplomas: diplomas,
  };
  return dentist
}

