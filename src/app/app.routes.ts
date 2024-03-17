import { Routes } from '@angular/router';
import { DashboardComponent } from './views/home/dashboard.component';
import { AttendanceComponent } from './views/attendance/attendance.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'attendance', component: AttendanceComponent },
];
