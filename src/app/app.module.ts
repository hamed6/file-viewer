import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ManualsComponent } from './manuals/manuals.component';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule,MatCardModule, MatButtonModule, MatToolbarModule ,  MatGridListModule, MatSnackBarModule } from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';

// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


import {UserprofilesService} from './userprofiles.service';
import { RegisterComponent } from './register/register.component';
import { GeneralInfoComponent } from './manuals/general-info.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


// import {Component} from '@angular/core';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'manual', component:ManualsComponent},
  {path:'', component:ManualsComponent},
  //{path:'register', component:RegisterComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManualsComponent,
    RegisterComponent,
    GeneralInfoComponent,
    // MatProgressBarModule,
    
    // MatBottomSheet,
    // MatBottomSheetRef,    
  
    // MatSnackBarModule
    // MatGridListModule
    // Component
    // FormsModule,
      
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDividerModule,
    MatBottomSheetModule,
    MatTabsModule,
    MatProgressBarModule,
    // MatBottomSheet,
    // MatBottomSheetRef,
    
    // TO ENABLE SERVICE WORKER 
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    
    // Component,
    // MatBottomSheetRef,
    // MatBottomSheet,
    // MatBottomSheetRef,
    // MatToolbar
    // Component
  ],
  entryComponents:[GeneralInfoComponent],
  providers: [UserprofilesService],
  bootstrap: [AppComponent]
})
export class AppModule { }


