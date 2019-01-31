import { Component, OnInit } from '@angular/core';
import { UserService } from '../_shared/user-service';
import { DsaDataService } from '../_shared/dsa-data-service';
import { ActivatedRoute } from '@angular/router';
import { DataType } from '../_shared/dsa-link/dsa-link.component';

@Component({
  selector: 'dsa-location-component',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  DataType = DataType;
  Object = Object;
  id: string;
  name: string;
  visible = false;
  taverns: Object;
  shops: Object;
  temples: Object;
  others: Object;

  openElement: string;

  constructor(private route: ActivatedRoute,
              private dataService: DsaDataService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.onUserChange().subscribe(() => {
      this.route.paramMap.subscribe((map) => {
        this.id = map.get('id');
        console.log(this.id);
        this.dataService.maySeeData(DataType.LOCATION, this.id).subscribe(response => {
          this.visible = response;
          console.log(this.visible);
        });
        this.name = this.dataService.getName(this.id);
        console.log(this.name);
        this.dataService.getData(DataType.LOCATION, this.id, 'taverns').subscribe(data => {
          console.log(data);
          this.taverns = data['linked'];
          console.log(this.taverns);
        });
        this.dataService.getData(DataType.LOCATION, this.id, 'shops').subscribe(data => {
          this.shops = data['linked'];
          console.log(this.shops);
        });
        this.dataService.getData(DataType.LOCATION, this.id, 'temples').subscribe(data => {
          this.temples = data['linked'];
          console.log(this.temples);
        });
        this.dataService.getData(DataType.LOCATION, this.id, 'others').subscribe(data => {
          this.others = data['linked'];
          console.log(this.others);
        });
      });
    });
  }

}
