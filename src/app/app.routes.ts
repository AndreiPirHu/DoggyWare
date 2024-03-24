import { Routes } from '@angular/router';
import { DashboardComponent } from './views/home/dashboard.component';
import { AttendanceComponent } from './views/attendance/attendance.component';
import { CatalogueComponent } from './views/catalogue/catalogue.component';
import { DogInformationComponent } from './views/dog-information/dog-information.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'catalogue', component: CatalogueComponent },
  { path: 'catalogue/:dogChipNumber', component: DogInformationComponent },
];
