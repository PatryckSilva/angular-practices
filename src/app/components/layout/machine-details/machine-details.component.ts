import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SocketServiceService } from '../../../services/socket-service.service';
import { TStatusKeyType, TMachine } from '../../../../@types';
import { MachinesService } from '../../../services/machines.service';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';

@Component({
  selector: 'app-machine-details',
  imports: [
    RouterModule,

    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
  ],
  templateUrl: './machine-details.component.html',
  styleUrl: './machine-details.component.css',
})
export class MachineDetailsComponent {
  socketService = inject(SocketServiceService);
  machinesService = inject(MachinesService);
  machineId: string | null = null;
  machineById!: TMachine | undefined;
  error!: { message: string };
  isLoading = true;

  constructor(private route: ActivatedRoute) {}

  async getMachineById() {
    try {
      const response = await this.machinesService.findMachineById(
        this.machineId!
      );

      if (!response.body) {
        this.error = { message: 'Erro' };
      }

      this.machineById = response.body;
    } catch (e) {
      console.log(e);
      const _error = e as Error;
      this.error = _error;
    } finally {
      this.isLoading = false;
    }
  }

  statusIcon(status: TStatusKeyType) {
    return this.machinesService.getStatusIcon(status);
  }

  async ngOnInit(): Promise<void> {
    this.machineId = this.route.snapshot.paramMap.get('id');

    this.getMachineById();

    this.socketService.getUpdatedMachine().subscribe((updatedMachine) => {
      const machineUpdate = updatedMachine as TMachine;

      if (machineUpdate.id === this.machineById?.id) {
        if (machineUpdate.status) {
          this.machineById.status = machineUpdate.status;
        }

        if (machineUpdate.location) {
          this.machineById.location = machineUpdate.location;
        }
      }
    });
  }
}
