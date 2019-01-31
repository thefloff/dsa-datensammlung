import { Component, OnInit } from '@angular/core';
import { DataType } from '../_shared/dsa-link/dsa-link.component';
import { DsaDataService } from '../_shared/dsa-data-service';
import { UserService } from '../_shared/user-service';

@Component({
  selector: 'dsa-ships-list',
  templateUrl: './ships-list.component.html',
  styleUrls: ['./ships-list.component.css']
})
export class ShipsListComponent implements OnInit {
  DataType = DataType;

  categoriesMap: Map<string, string[]>;

  constructor(private dataService: DsaDataService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.onUserChange().subscribe(() => {
      this.dataService.getShipsByCategory().subscribe(data => {
        this.categoriesMap = data;
      });
    });
  }

}
