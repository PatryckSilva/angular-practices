export enum StatusType {
  OFF = '❌',
  OPERATING = '✅',
  MAINTENANCE = '⚠️',
}

export type TStatusKeyType = keyof typeof StatusType;

export interface LogsResponse {
  id: number;
  machineName: string;
  machineId: string;
  status: string;
  updatedAt: Date;
}

export type TMachine = {
  id: string;
  name: string;
  location: string;
  status: TStatusKeyType;
  createdAt: string;
  updatedAt: string;
};

export type TRegisterMachine = {
  name: string;
  location: string;
  status: string;
};

export interface GoogleResponse {
  results: Result[];
  status: string;
}

export interface Result {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  types: string[];
}

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface Geometry {
  bounds: Bounds;
  location: Location;
  location_type: string;
  viewport: Bounds;
}

export interface Bounds {
  northeast: Location;
  southwest: Location;
}

export interface Location {
  lat: number;
  lng: number;
}
