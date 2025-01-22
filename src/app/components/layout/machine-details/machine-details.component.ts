import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SocketServiceService } from '../../../services/socket-service.service';
import { TStatusKeyType, TMachine } from '../../../../@types';
import { MachinesService } from '../../../services/machines.service';
import { GoogleMapsModule } from '@angular/google-maps';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { GeocodingService } from '../../../services/geocoding.service';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import {
  HlmAccordionContentComponent,
  HlmAccordionDirective,
  HlmAccordionItemDirective,
  HlmAccordionTriggerDirective,
} from '@spartan-ng/ui-accordion-helm';

@Component({
  selector: 'app-machine-details',
  imports: [
    RouterModule,

    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,

    HlmAccordionDirective,
    HlmAccordionItemDirective,
    HlmAccordionTriggerDirective,
    HlmAccordionContentComponent,
    HlmIconDirective,

    GoogleMapsModule,
  ],
  templateUrl: './machine-details.component.html',
  styleUrl: './machine-details.component.css',
})
export class MachineDetailsComponent {
  socketService = inject(SocketServiceService);
  machinesService = inject(MachinesService);
  geocodingService = inject(GeocodingService);

  machineId: string | null = null;
  machineById!: TMachine | undefined;
  error!: { message: string };
  isLoading = true;

  center!: google.maps.LatLngLiteral | undefined;
  zoom = 15;

  constructor(private route: ActivatedRoute) {}

  async updateMapCenter(location: string) {
    const response = await this.geocodingService.geocodeAddress(location);

    if (response.body) {
      const { lat, lng } = response.body.results[0].geometry.location;
      this.center = { lat, lng };
    } else {
      this.center = undefined;
    }
  }

  async getMachineById() {
    try {
      const response = await this.machinesService.findMachineById(
        this.machineId!
      );

      this.machineById = response.body;
      if (this.machineById) {
        this.updateMapCenter(this.machineById.location);
      }
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
          this.updateMapCenter(machineUpdate.location);
        }
      }
    });
  }
}
