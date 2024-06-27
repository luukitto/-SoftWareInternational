import { Component } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SoftwareInternational';
  constructor(private db: AngularFireDatabase) {}

  writeData() {
    this.db.list('/items').push({ name: 'Item 1', price: 10 });
  }

  readData() {
    this.db.list('/items').valueChanges().subscribe(items => {
      console.log(items);
    });
  }
}
