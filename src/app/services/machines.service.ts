import { Injectable } from '@angular/core';
import { httpClient } from '../../infra/http-client';
import {
  TStatusKeyType,
  StatusType,
  TMachine,
  TRegisterMachine,
  LogsResponse,
} from '../../@types';
import { HttpResponse } from '../../@types/httpTypes';
import { baseUrl, endpoints } from '../../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class MachinesService {
  constructor() {}

  async getAllMachines(): Promise<HttpResponse<TMachine[]>> {
    const url = `${baseUrl}/${endpoints.machines.getAll}`;
    const response = httpClient.request({ method: 'get', url });
    return response;
  }

  async createMachine(body: TRegisterMachine): Promise<HttpResponse<TMachine>> {
    const url = `${baseUrl}/${endpoints.machines.create}`;
    const response = httpClient.request({ method: 'post', url, body });

    return response;
  }

  async findMachineById(id: string): Promise<HttpResponse<TMachine>> {
    const url = `${baseUrl}/${endpoints.machines.getById}/${id}`;

    const response = httpClient.request({ method: 'get', url });

    return response;
  }

  getStatusIcon(status: TStatusKeyType): string {
    return StatusType[status];
  }

  async getLogs(): Promise<HttpResponse<LogsResponse[]>> {
    const url = `${baseUrl}/${endpoints.machines.logs}`;
    const response = httpClient.request({ method: 'get', url });

    return response;
  }
}
