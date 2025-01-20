export enum StatusType {
  OFF = '❌',
  OPERATING = '✅',
  MAINTENANCE = '⚠️',
}

export type TStatusKeyType = keyof typeof StatusType;

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
