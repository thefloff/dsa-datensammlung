import { Component, OnInit } from '@angular/core';
import { DataType } from '../_shared/dsa-link/dsa-link.component';
import { DsaDataService } from '../_shared/dsa-data-service';
import { UserService } from '../_shared/user-service';

@Component({
  selector: 'dsa-adventures-list',
  templateUrl: './adventures-list.component.html',
  styleUrls: ['./adventures-list.component.css']
})
export class AdventuresListComponent implements OnInit {
  DataType = DataType;

  categoriesMap: Map<string, string[]>;

  constructor(private dataService: DsaDataService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.onUserChange().subscribe(() => {
      this.dataService.getAdventuresByCategory().subscribe(data => {
        this.categoriesMap = data;
      });
    });
  }

}
