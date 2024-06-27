import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppComponent} from "./app.component";
import {environment} from "./environments/environments";
import {AngularFireModule} from "@angular/fire/compat";



@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
