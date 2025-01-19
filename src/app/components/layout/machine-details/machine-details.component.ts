import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-machine-details',
  imports: [RouterModule],
  templateUrl: './machine-details.component.html',
  styleUrl: './machine-details.component.css',
})
export class MachineDetailsComponent {
  machineId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.machineId = this.route.snapshot.paramMap.get('id');
  }
}
