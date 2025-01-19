import { Routes } from '@angular/router';
import { MachineDetailsComponent } from './components/layout/machine-details/machine-details.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'maquinas/:id',
    component: MachineDetailsComponent,
  },
];
