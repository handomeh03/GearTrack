import { Routes } from '@angular/router';
import { login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Equipment } from './pages/Equipment/Equipment';
import { Checkouts } from './pages/Checkouts/Checkouts';
import { auditlog } from './pages/AuditLog/AuditLog';
import { ReverstationStaff } from './pages/Photoshot/ReverstationStaff';
import { Guest } from './pages/Guest/Guests';
import { reversationPhotoShot } from './pages/reversationPhotoShot/reversationPhotoShot';


export const routes: Routes = [
  {path:"",component:Guest},
  { path: 'login', component: login },
  {path :'register',component:Register},
  {path:"Dashboard",component:Dashboard,children:[
     {path:"allequipment",component:Equipment},
     {path:"reversationPhotoShot",component:reversationPhotoShot},
     {path:"checkouts",component:Checkouts},
     {path:"auditlog",component:auditlog},
     {path:"ReverstationStaff",component:ReverstationStaff}
  ]}
];
