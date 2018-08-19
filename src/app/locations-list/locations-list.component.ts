import { Component, OnInit } from '@angular/core';
import {DataType} from '../_shared/dsa-link/dsa-link.component';
import {UserService} from '../_shared/user-service';
import {DsaDataService} from '../_shared/dsa-data-service';

@Component({
  selector: 'dsa-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css']
})
export class LocationsListComponent implements OnInit {
  DataType = DataType;

  towns = ['kellun', 'neetha'];

  canSeeTowns = false;

  constructor(private dataService: DsaDataService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(() => {
      this.updateVisibleCategories();
    });
  }

  updateVisibleCategories() {
    this.canSeeTowns = false;
    for (const item of this.towns) {
      this.dataService.getLocation(item).subscribe((response) => {
        if (response) {
          this.canSeeTowns = true;
        }
      });
    }
  }

}
