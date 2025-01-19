export enum StatusType {
  off = 'OFF',
  operating = 'OPERATING',
  maintenance = 'MAINTENANCE',
}

export type TMachine = {
  id: string;
  name: string;
  location: string;
  status: StatusType;
  createdAt: string;
  updatedAt: string;
};

export type TRegisterMachine = {
  name: string;
  location: string;
  status: string;
};
