import { Component, Input, OnInit } from '@angular/core';
import { DsaDataService } from '../dsa-data-service';
import { UserService } from '../user-service';

export enum DataType {
  CHARACTER,
  SHIP,
  LOCATION,
  ADVENTURE,
  GROUP,
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
  @Input() prefix: string = null;
  @Input() suffix: string = null;
  visible = false;
  text: string;
  route_path: string;

  constructor(private dataService: DsaDataService,
              private userService: UserService) {}

  ngOnInit() {
    this.userService.onUserChange().subscribe(() => {
      this.updateLink();
    });
    this.updateLink();
  }

  updateLink() {
    switch (this.type) {
      case DataType.ADVENTURE:
        this.dataService.maySeeData(DataType.ADVENTURE, this.data_id).subscribe((response) => {
          this.visible = response;
          this.route_path = 'adventures/' + this.data_id;
          this.text = response ? this.dataService.getName(this.data_id) : 'not visible';
        });
        break;
      case DataType.CHARACTER:
        this.dataService.maySeeData(DataType.CHARACTER, this.data_id).subscribe((response) => {
          this.visible = response;
          this.route_path = 'characters/' + this.data_id;
          this.text = response ? this.dataService.getName(this.data_id) : 'not visible';
        });
        break;
      case DataType.LOCATION:
        this.dataService.maySeeData(DataType.LOCATION, this.data_id).subscribe((response) => {
          this.visible = response;
          this.route_path = 'locations/' + this.data_id;
          this.text = response ? this.dataService.getName(this.data_id) : 'not visible';
        });
        break;
      case DataType.SHIP:
        this.dataService.maySeeData(DataType.SHIP, this.data_id).subscribe((response) => {
          this.visible = response;
          this.route_path = 'ships/' + this.data_id;
          this.text = response ? this.dataService.getName(this.data_id) : 'not visible';
        });
        break;
      case DataType.GROUP:
        this.dataService.maySeeData(DataType.GROUP, this.data_id).subscribe((response) => {
          this.visible = response;
          this.route_path = 'groups/' + this.data_id;
          this.text = response ? this.dataService.getName(this.data_id) : 'not visible';
        });
        break;
    }
  }

}
