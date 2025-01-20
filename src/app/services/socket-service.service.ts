import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
@Injectable({
  providedIn: 'root',
})
export class SocketServiceService {
  private socket = io('ws://localhost:5000');
  constructor() {}

  getUpdatedMachinesList() {
    return new Observable((observer) => {
      this.socket.on('MachineList', (list) => {
        observer.next(list);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  getUpdatedMachine() {
    return new Observable((observer) => {
      this.socket.on('newMachineUpdate', (machine) => {
        observer.next(machine);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }
}
