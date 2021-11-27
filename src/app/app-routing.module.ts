import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BasicFunctionsComponent} from './basic-functions/basic-functions.component';
const routes: Routes = [
  {path: 'BasicFunctions', component: BasicFunctionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
