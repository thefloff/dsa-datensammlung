import { Component, OnInit } from '@angular/core';
import { DataType } from '../_shared/dsa-link/dsa-link.component';
import { UserService } from '../_shared/user-service';
import { DsaDataService } from '../_shared/dsa-data-service';

@Component({
  selector: 'dsa-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css']
})
export class LocationsListComponent implements OnInit {
  DataType = DataType;

  categoriesMap: Map<string, string[]>;

  constructor(private dataService: DsaDataService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.onUserChange().subscribe(() => {
      this.dataService.getLocationsByCategory().subscribe(data => {
        this.categoriesMap = data;
      });
    });
  }

}
