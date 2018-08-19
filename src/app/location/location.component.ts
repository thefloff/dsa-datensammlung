import { Component, OnInit } from '@angular/core';
import { UserService } from '../_shared/user-service';
import { DsaDataService } from '../_shared/dsa-data-service';
import { ActivatedRoute } from '@angular/router';
import { LocationDto } from '../_shared/location-dto';
import { DataType } from '../_shared/dsa-link/dsa-link.component';

@Component({
  selector: 'dsa-location-component',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  DataType = DataType;

  location: LocationDto;

  openElement = -1;

  constructor(private route: ActivatedRoute,
              private dataService: DsaDataService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(() => {
      this.route.paramMap.subscribe((map) => {
        this.dataService.getLocation(map.get('id')).subscribe((data) => {
          if (data) {
            this.location = data;
          }
        });
      });
    });
  }

}
