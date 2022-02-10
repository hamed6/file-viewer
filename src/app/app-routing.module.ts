import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ManualsComponent } from './manuals/manuals.component';
import {RegisterComponent} from './register/register.component'

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'manual', component:ManualsComponent},
  {path:'', component:LoginComponent},
  {path:'register', component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
