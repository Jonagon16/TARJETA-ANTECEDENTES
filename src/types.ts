export interface PersonData {
  name: string;
  birthDate: string;
  age: number;
  street: string;
  number: string;
  city: string;
  province: string;
}

export interface VehicleData {
  licensePlate: string;
  status: string;
  source: string;
  brand: string;
  model: string;
  engine: string;
  chassis: string;
  registry: string;
  ownerName: string;
  ownerId: string;
  cedula?: string;
  penalStatus: string;
}

export interface BackgroundCheckData {
  person?: PersonData;
  vehicle?: VehicleData;
}
