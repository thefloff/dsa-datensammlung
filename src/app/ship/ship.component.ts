import { Component, OnInit } from '@angular/core';
import { ShipDto } from '../_shared/ship-dto';
import { ActivatedRoute } from '@angular/router';
import { DsaDataService } from '../_shared/dsa-data-service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserService } from '../_shared/user-service';
import { DataType } from '../_shared/dsa-link/dsa-link.component';

@Component({
  selector: 'dsa-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css']
})
export class ShipComponent implements OnInit {
  DataType = DataType;

  ship: ShipDto;
  imgUrl: SafeUrl;

  constructor(private route: ActivatedRoute,
              private dataService: DsaDataService,
              private sanitizer: DomSanitizer,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(() => {
      this.route.paramMap.subscribe((map) => {
        this.dataService.getShip(map.get('id')).subscribe((data) => {
          if (data) {
            this.ship = data;
            this.imgUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/' + this.ship.image);
          }
        });
      });
    });
  }

}
