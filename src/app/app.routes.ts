import { Routes } from '@angular/router';
import { MachineDetailsComponent } from './components/layout/machine-details/machine-details.component';
import { HomeComponent } from './pages/home/home.component';
import { LogsPageComponent } from './pages/logs-page/logs-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'maquinas/:id',
    component: MachineDetailsComponent,
  },
  {
    path: 'logs',
    component: LogsPageComponent,
  },
];
