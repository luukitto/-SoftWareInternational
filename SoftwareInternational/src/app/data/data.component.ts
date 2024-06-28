import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  data: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.readData();
  }

  writeData(): void {
    const newData = { name: 'Item 2', price: 200 };
    this.dataService.writeData(newData).subscribe(() => {
      this.readData();
    });
  }

  readData(): void {
    this.dataService.readData().subscribe(data => {
      this.data = data;
    });
  }
}
