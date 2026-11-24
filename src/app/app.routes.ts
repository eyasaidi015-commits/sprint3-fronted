import { Routes } from '@angular/router';
import { Pharmacies } from './pharmacies/pharmacies';
import { AddPharmacie } from './add-pharmacie/add-pharmacie';
import { UpdatePharmacie } from './update-pharmacie/update-pharmacie';
import { RecherchePharmacie } from './recherche-pharmacie/recherche-pharmacie';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { pharmacieGuard } from './pharmacie-guard';
import { ListeTypes } from './liste-types/liste-types';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'app-forbidden', component: Forbidden },
  { path: 'pharmacies', component: Pharmacies },
  { path: 'recherche-pharmacie', component: RecherchePharmacie },
  { path: 'add-pharmacie', component: AddPharmacie, canActivate: [pharmacieGuard] },
  { path: 'updatePharmacie/:id', component: UpdatePharmacie, canActivate: [pharmacieGuard] },
  { path: '', redirectTo: 'pharmacies', pathMatch: 'full' },
  { path: 'listeTypes', component: ListeTypes, canActivate: [pharmacieGuard] }
];