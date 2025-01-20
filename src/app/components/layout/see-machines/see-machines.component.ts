import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { MachinesService } from '../../../services/machines.service';
import { TStatusKeyType, TMachine, StatusType } from '../../../../@types';
import { SocketServiceService } from '../../../services/socket-service.service';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';

@Component({
  selector: 'app-see-machines',
  imports: [
    HlmButtonDirective,

    // HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,

    HlmBadgeDirective,

    RouterModule,
  ],
  templateUrl: './see-machines.component.html',
  styleUrl: './see-machines.component.css',
})
export class SeeMachinesComponent {
  filterOptions = ['ALL', ...Object.keys(StatusType)];
  router = inject(Router);
  socketService = inject(SocketServiceService);
  machinesService = inject(MachinesService);
  isLoadingMachines = true;
  selectedFilterStatus: string | TStatusKeyType = this.filterOptions[0];

  listMachines: TMachine[] = [];
  filteredMachines: TMachine[] = [];

  statusIcon(status: TStatusKeyType) {
    return this.machinesService.getStatusIcon(status);
  }

  handleSelectFilterStatus(clickedFilterStatus: string) {
    this.selectedFilterStatus = clickedFilterStatus;

    this.filteredMachines = this.listMachines.filter(
      (item) =>
        item.status === this.selectedFilterStatus ||
        this.selectedFilterStatus === 'ALL'
    );
  }

  getSelectedBadgeVariant(badgeValue: string) {
    if (badgeValue !== this.selectedFilterStatus) {
      return 'secondary';
    }

    return 'default';
  }

  ngOnInit() {
    this.socketService.getUpdatedMachinesList().subscribe((list) => {
      console.log(`this.selectedFilterStatus`, this.selectedFilterStatus);
      this.listMachines = (list as TMachine[]).sort((a, b) =>
        a.createdAt.localeCompare(b.createdAt)
      );

      this.filteredMachines = this.listMachines.filter(
        (item) =>
          item.status === this.selectedFilterStatus ||
          this.selectedFilterStatus === 'ALL'
      );

      this.isLoadingMachines = false;
    });
  }
}
