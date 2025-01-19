import { Component } from '@angular/core';
import {
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@spartan-ng/ui-tabs-helm';
import { CreateMachineComponent } from '../../components/layout/create-machine/create-machine.component';
import { SeeMachinesComponent } from '../../components/layout/see-machines/see-machines.component';

@Component({
  selector: 'app-home',
  imports: [
    HlmTabsComponent,
    HlmTabsContentDirective,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,

    CreateMachineComponent,
    SeeMachinesComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
