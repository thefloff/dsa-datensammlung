import { Component, Input, OnInit } from '@angular/core';
import { DsaDataService } from '../dsa-data-service';
import { UserService } from '../user-service';

export enum DataType {
  CHARACTER, SHIP, LOCATION, ADVENTURE
}

@Component({
  selector: 'dsa-dsa-link',
  templateUrl: './dsa-link.component.html',
  styleUrls: ['./dsa-link.component.css']
})
export class DsaLinkComponent implements OnInit {
  @Input() data_id: string;
  @Input() type: DataType;
  @Input() list: boolean;
  visible = false;
  text: string;
  route_path: string;

  constructor(private dataService: DsaDataService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(() => this.updateLink());
  }

  updateLink() {
    switch (this.type) {
      case DataType.ADVENTURE:
        this.dataService.getAdventure(this.data_id).subscribe(adventure => {
          this.visible = !!adventure;
          this.route_path = 'adventures/' + this.data_id;
          this.text = adventure ? adventure.name : 'not visible';
        });
        break;
      case DataType.CHARACTER:
        this.dataService.getCharacter(this.data_id).subscribe(character => {
          this.visible = !!character;
          this.route_path = 'characters/' + this.data_id;
          this.text = character ? character.name : 'not visible';
        });
        break;
      case DataType.LOCATION:
        this.dataService.getLocation(this.data_id).subscribe(location => {
          this.visible = !!location;
          this.route_path = 'locations/' + this.data_id;
          this.text = location ? location.name : 'not visible';
        });
        break;
      case DataType.SHIP:
        this.dataService.getShip(this.data_id).subscribe(ship => {
          this.visible = !!ship;
          this.route_path = 'ships/' + this.data_id;
          this.text = ship ? ship.name : 'not visible';
        });
        break;
    }
  }

}
