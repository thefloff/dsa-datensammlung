import { Component, OnInit } from '@angular/core';
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
  id: string;
  name: string;
  visible = false;
  imgUrl: SafeUrl;
  speed: object;

  constructor(private route: ActivatedRoute,
              private dataService: DsaDataService,
              private sanitizer: DomSanitizer,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.onUserChange().subscribe(() => {
      this.route.paramMap.subscribe((map) => {
        this.id = map.get('id');
        this.dataService.maySeeData(DataType.SHIP, this.id).subscribe(response => {
          this.visible = response;
        });
        this.name = this.dataService.getName(this.id);
        this.imgUrl = this.sanitizer.bypassSecurityTrustResourceUrl( 'assets/img/' + this.id + '.jpg');
        this.dataService.getData(DataType.SHIP, this.id, 'speed').subscribe(speed => {
          this.speed = speed['linked'];
        });
      });
    });
  }

}
