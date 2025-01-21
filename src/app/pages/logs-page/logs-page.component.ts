import { Component, inject } from '@angular/core';
import { MachinesService } from '../../services/machines.service';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { LogsResponse } from '../../../@types';

@Component({
  selector: 'app-logs-page',
  imports: [
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
  ],
  templateUrl: './logs-page.component.html',
  styleUrl: './logs-page.component.css',
})
export class LogsPageComponent {
  machinesService = inject(MachinesService);
  listLogs: LogsResponse[] = [];

  async getAllLogs() {
    const response = await this.machinesService.getLogs();
    if (!response?.body) {
      this.listLogs = [];
    } else {
      this.listLogs = response.body;
    }
  }

  ngOnInit() {
    this.getAllLogs();
  }
}
