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
import { TMachine } from '../../../../@types';

@Component({
  selector: 'app-see-machines',
  imports: [
    HlmButtonDirective,

    // HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,

    RouterModule,
  ],
  templateUrl: './see-machines.component.html',
  styleUrl: './see-machines.component.css',
})
export class SeeMachinesComponent {
  router = inject(Router);
  machinesService = inject(MachinesService);
  isLoadingMachines = true;

  listMachines: TMachine[] | [] = [];

  async getMachines() {
    try {
      const response = await this.machinesService.getAllMachines();

      this.listMachines = response?.body || [];
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoadingMachines = false;
      console.log(`this.isLoadingMachines`, this.isLoadingMachines);
    }
  }

  ngOnInit() {
    this.getMachines();
  }
}
