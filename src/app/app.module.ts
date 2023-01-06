import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { BasicFunctionsComponent } from './basic-functions/basic-functions.component';
import { ToxicityComponent } from './toxicity/toxicity.component';
import { NolinearComponent } from './nolinear/nolinear.component';
// Add flex-layout
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion/dialogo-confirmacion.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        BasicFunctionsComponent,
        ToxicityComponent,
        NolinearComponent,
        DialogoConfirmacionComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatButtonModule,
        FlexLayoutModule,
        LayoutModule,
        MatBadgeModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatInputModule,
        MatProgressSpinnerModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {    
  }
 }
