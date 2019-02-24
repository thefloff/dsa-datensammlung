import { Component, OnInit } from '@angular/core';
import { DsaDataService } from '../_shared/dsa-data-service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_shared/user-service';
import { DataType } from '../_shared/dsa-link/dsa-link.component';
import {PermissionsFormComponent} from '../_shared/permissions-form/permissions-form.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'dsa-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  DataType = DataType;
  Object = Object;
  name: string;
  id: string;
  visible = false;
  members: Object;
  isOwner = false;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private dataService: DsaDataService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.userService.onUserChange().subscribe(() => {
      this.route.paramMap.subscribe((map) => {
        this.id = map.get('id');
        this.dataService.maySeeData(DataType.GROUP, this.id).subscribe((response) => {
          this.visible = response;
        });
        this.name = this.dataService.getName(this.id);
        this.dataService.getData(DataType.GROUP, this.id, 'members').subscribe(data => {
          this.members = data['linked'];
          if (!this.members) { this.members = []; }
        });
      });
      this.dataService.isOwner(DataType.GROUP, this.id).subscribe(result => {
        this.isOwner = result;
      });
    });
  }

  openPermissionsForm() {
    const modalRef = this.modalService.open(PermissionsFormComponent);
    (<PermissionsFormComponent>modalRef.componentInstance).dataType = DataType.GROUP;
    (<PermissionsFormComponent>modalRef.componentInstance).id = this.id;
    (<PermissionsFormComponent>modalRef.componentInstance).field = null;
  }

}
