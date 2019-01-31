import { Component, OnInit } from '@angular/core';
import { UserService } from '../_shared/user-service';
import { DsaDataService } from '../_shared/dsa-data-service';
import { ActivatedRoute } from '@angular/router';
import { DataType } from '../_shared/dsa-link/dsa-link.component';
import {PermissionsFormComponent} from '../_shared/permissions-form/permissions-form.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
  isOwner = false;

  openElement: string;

  constructor(private route: ActivatedRoute,
              private dataService: DsaDataService,
              private userService: UserService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.userService.onUserChange().subscribe(() => {
      this.route.paramMap.subscribe((map) => {
        this.id = map.get('id');
        this.dataService.maySeeData(DataType.LOCATION, this.id).subscribe(response => {
          this.visible = response;
        });
        this.name = this.dataService.getName(this.id);
        this.dataService.getData(DataType.LOCATION, this.id, 'taverns').subscribe(data => {
          this.taverns = data['linked'];
        });
        this.dataService.getData(DataType.LOCATION, this.id, 'shops').subscribe(data => {
          this.shops = data['linked'];
        });
        this.dataService.getData(DataType.LOCATION, this.id, 'temples').subscribe(data => {
          this.temples = data['linked'];
        });
        this.dataService.getData(DataType.LOCATION, this.id, 'others').subscribe(data => {
          this.others = data['linked'];
        });
      });
      this.dataService.isOwner(DataType.LOCATION, this.id).subscribe(result => {
        this.isOwner = result;
      });
    });
  }

  openPermissionsForm() {
    const modalRef = this.modalService.open(PermissionsFormComponent);
    (<PermissionsFormComponent>modalRef.componentInstance).dataType = DataType.LOCATION;
    (<PermissionsFormComponent>modalRef.componentInstance).id = this.id;
    (<PermissionsFormComponent>modalRef.componentInstance).field = null;
  }

}
