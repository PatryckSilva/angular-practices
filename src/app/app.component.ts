import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@spartan-ng/ui-tabs-helm';
import { CreateMachineComponent } from './components/layout/create-machine/create-machine.component';
import { SeeMachinesComponent } from './components/layout/see-machines/see-machines.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HlmTabsComponent,
    HlmTabsContentDirective,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    CreateMachineComponent,
    SeeMachinesComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Machine';
}
