import { Injectable } from '@angular/core';
import { httpClient } from '../../infra/http-client';
import {
  TStatusKeyType,
  StatusType,
  TMachine,
  TRegisterMachine,
} from '../../@types';
import { HttpResponse } from '../../@types/httpTypes';

@Injectable({
  providedIn: 'root',
})
export class MachinesService {
  constructor() {}

  async getAllMachines(): Promise<HttpResponse<TMachine[]>> {
    const url = 'http://localhost:5000/machines/';
    const response = httpClient.request({ method: 'get', url });
    return response;
  }

  async createMachine(body: TRegisterMachine): Promise<HttpResponse<TMachine>> {
    const url = 'http://localhost:5000/machines/create';
    const response = httpClient.request({ method: 'post', url, body });

    return response;
  }

  async findMachineById(id: string): Promise<HttpResponse<TMachine>> {
    const url = `http://localhost:5000/machines/find-by-id/${id}`;
    const response = httpClient.request({ method: 'get', url });

    return response;
  }

  getStatusIcon(status: TStatusKeyType): string {
    return StatusType[status];
  }
}
