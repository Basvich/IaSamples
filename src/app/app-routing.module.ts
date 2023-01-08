import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BasicFunctionsComponent} from './basic-functions/basic-functions.component';
import { ToxicityComponent } from './toxicity/toxicity.component';
import { NolinearComponent } from './nolinear/nolinear.component';
const routes: Routes = [
  {path: 'BasicFunctions', component: BasicFunctionsComponent },
  {path: 'Toxicity', component: ToxicityComponent },
  {path: 'NoLinear', component: NolinearComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
