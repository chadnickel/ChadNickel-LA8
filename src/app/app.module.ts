import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'
@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
  
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
