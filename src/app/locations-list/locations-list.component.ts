import { Component, OnInit } from '@angular/core';
import { DataType } from '../_shared/dsa-link/dsa-link.component';
import { UserService } from '../_shared/user-service';
import { DsaDataService } from '../_shared/dsa-data-service';
import {PermissionsFormComponent} from '../_shared/permissions-form/permissions-form.component';
import {EditEntryFormComponent} from '../_shared/edit-entry-form/edit-entry-form.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'dsa-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css']
})
export class LocationsListComponent implements OnInit {
  DataType = DataType;

  categoriesMap: Map<string, string[]>;

  constructor(private dataService: DsaDataService,
              private userService: UserService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.userService.onUserChange().subscribe(() => {
      this.dataService.getLocationsByCategory().subscribe(data => {
        this.categoriesMap = data;
      });
    });
  }

  openNewForm() {
    const modalRef = this.modalService.open(EditEntryFormComponent);
    (<PermissionsFormComponent>modalRef.componentInstance).dataType = DataType.LOCATION;

    modalRef.result.then(() => {
      this.dataService.updateEntries();
      setTimeout(() => {
          this.dataService.getLocationsByCategory().subscribe(data => {
            this.categoriesMap = data;
          });
        },
        2000);
    });
  }

}
