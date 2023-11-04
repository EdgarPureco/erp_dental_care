import { Person } from "./person";
import { User } from "./user";

export interface Dentist {
  person: Person;
  user: User;
  professional_license: string;
  hired_at: string;
  position: string;
  weekdays: number[];
  start_hour: number;
  start_minute: number;
  end_hour: number;
  end_minute: number;
  frequency_id: number;
  diplomas: Diploma[];
}
export interface Diploma {
  name: string;
  university: string;
}

export function createDentist(obj: any) {
  let startTime = new Date(obj.start_time)
  let endTime = new Date(obj.end_time)

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
    image: ''
  };
  const diplomas: Diploma[] = [];

  const dentist: Dentist = {
    person: person,
    user: user,
    professional_license: obj.professional_license,
    hired_at: obj.hired_at,
    position: obj.position,
    weekdays: getWeekdays(obj),
    start_hour: startTime.getHours(),
    start_minute: startTime.getMinutes(),
    end_hour: endTime.getHours(),
    end_minute: endTime.getMinutes(),
    frequency_id: obj.frequency_id,
    diplomas: diplomas,
  };
  return dentist
}

function getWeekdays(obj: any) {
  let days: number[] = [ ]

  if (obj.monday !== null) {
    days.push(1)
  }
  if (obj.tuesday !== null) {
    days.push(2)
  }
  if (obj.wednesday !== null) {
    days.push(3)
  }
  if (obj.thursday !== null) {
    days.push(4)
  }
  if (obj.friday !== null) {
    days.push(5)
  }
  if (obj.saturday !== null) {
    days.push(6)
  }
  if (obj.sunday !== null) {
    days.push(7)
  }

  return days
}