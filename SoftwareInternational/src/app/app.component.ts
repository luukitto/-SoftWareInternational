import { Component } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AppModule} from "./app.module";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SoftwareInternational';
}
