import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BasicFunctionsComponent} from './basic-functions/basic-functions.component';
import { ToxicityComponent } from './toxicity/toxicity.component';
const routes: Routes = [
  {path: 'BasicFunctions', component: BasicFunctionsComponent },
  {path: 'Toxicity', component: ToxicityComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
