import { Component, OnInit } from '@angular/core';
import { UserService } from '../_shared/user-service';
import { ActivatedRoute } from '@angular/router';
import { DsaDataService } from '../_shared/dsa-data-service';
import { DataType } from '../_shared/dsa-link/dsa-link.component';
import {PermissionsFormComponent} from '../_shared/permissions-form/permissions-form.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'dsa-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.css']
})
export class AdventureComponent implements OnInit {
  DataType = DataType;
  name: string;
  id: string;
  visible = false;
  isOwner = false;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private dataService: DsaDataService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.userService.onUserChange().subscribe(() => {
      this.route.paramMap.subscribe((map) => {
        this.id = map.get('id');
        this.dataService.maySeeData(DataType.ADVENTURE, this.id).subscribe(response => {
          this.visible = response;
        });
        this.name = this.dataService.getName(this.id);
      });
      this.dataService.isOwner(DataType.ADVENTURE, this.id).subscribe(result => {
        this.isOwner = result;
      });
    });
  }

  openPermissionsForm() {
    const modalRef = this.modalService.open(PermissionsFormComponent);
    (<PermissionsFormComponent>modalRef.componentInstance).dataType = DataType.ADVENTURE;
    (<PermissionsFormComponent>modalRef.componentInstance).id = this.id;
    (<PermissionsFormComponent>modalRef.componentInstance).field = null;
  }

}
