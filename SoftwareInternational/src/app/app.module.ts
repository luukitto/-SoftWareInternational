import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from "./app.component";
import { environment } from "./environments/environments";
import {AngularFireModule} from "@angular/fire/compat";
import { DataComponent } from "./data/data.component";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app.routes";



@NgModule({
  declarations: [
    AppComponent,
    DataComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
