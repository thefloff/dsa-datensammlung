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

  playerShips = ['moewe'];
  tradeShips = [];
  pirateShips = ['birsel', 'MDW', 'desideria', 'uborasha'];
  militaryShips = [];

  canSeePlayerShips = false;
  canSeeTradeShips = false;
  canSeePirateShips = false;
  canSeeMilitaryShips = false;

  constructor(private dataService: DsaDataService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(() => {
      this.updateVisibleCategories();
    });
  }

  updateVisibleCategories() {
    this.canSeePlayerShips = false;
    for (const item of this.playerShips) {
      this.dataService.getShip(item).subscribe((response) => {
        if (response) {
          this.canSeePlayerShips = true;
        }
      });
    }

    this.canSeeTradeShips = false;
    for (const item of this.tradeShips) {
      this.dataService.getShip(item).subscribe((response) => {
        if (response) {
          this.canSeeTradeShips = true;
        }
      });
    }

    this.canSeePirateShips = false;
    for (const item of this.pirateShips) {
      this.dataService.getShip(item).subscribe((response) => {
        if (response) {
          this.canSeePirateShips = true;
        }
      });
    }

    this.canSeeMilitaryShips = false;
    for (const item of this.militaryShips) {
      this.dataService.getShip(item).subscribe((response) => {
        if (response) {
          this.canSeeMilitaryShips = true;
        }
      });
    }
  }

}
