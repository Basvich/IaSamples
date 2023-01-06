import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import {MatBadgeModule} from '@angular/material/badge';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatLegacyMenuModule as MatMenuModule} from '@angular/material/legacy-menu';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { BasicFunctionsComponent } from './basic-functions/basic-functions.component';
import { ToxicityComponent } from './toxicity/toxicity.component';
import { NolinearComponent } from './nolinear/nolinear.component';
// Add flex-layout
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion/dialogo-confirmacion.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';


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
