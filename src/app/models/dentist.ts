
  interface Dentist {
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

  interface Diploma {
    name: string;
    university: string;
  }
  