import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DsaDataService } from '../_shared/dsa-data-service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserService } from '../_shared/user-service';
import { DataType } from '../_shared/dsa-link/dsa-link.component';
import {PermissionsFormComponent} from '../_shared/permissions-form/permissions-form.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
  isOwner = false;

  constructor(private route: ActivatedRoute,
              private dataService: DsaDataService,
              private sanitizer: DomSanitizer,
              private userService: UserService,
              private modalService: NgbModal) { }

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
      this.dataService.isOwner(DataType.SHIP, this.id).subscribe(result => {
        this.isOwner = result;
      });
    });
  }

  openPermissionsForm() {
    const modalRef = this.modalService.open(PermissionsFormComponent);
    (<PermissionsFormComponent>modalRef.componentInstance).dataType = DataType.SHIP;
    (<PermissionsFormComponent>modalRef.componentInstance).id = this.id;
    (<PermissionsFormComponent>modalRef.componentInstance).field = null;
  }

}
