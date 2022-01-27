import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import {MaterialModule} from '../app/material/material.module';
import { HomePageComponent } from './home-page/home-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http'
import { AccountService } from 'services/account.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomValidationsService } from 'services/custom-validations.service';
import { LocationService } from 'services/location.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LandingPageComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule ,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    
    
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[LoginComponent],
  providers: [AccountService,CustomValidationsService ,LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
