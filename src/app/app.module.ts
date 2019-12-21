import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'

import { ToastModule } from './toast/toast.module';
import { LoginComponent } from './login/login.component';
import {AppRoutes} from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    LoginComponent,
  
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ToastModule,
    AppRoutes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
