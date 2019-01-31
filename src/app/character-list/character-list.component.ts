import { Component, OnInit } from '@angular/core';
import { DataType } from '../_shared/dsa-link/dsa-link.component';
import { DsaDataService } from '../_shared/dsa-data-service';
import { UserService } from '../_shared/user-service';
import {PermissionsFormComponent} from '../_shared/permissions-form/permissions-form.component';
import {EditEntryFormComponent} from '../_shared/edit-entry-form/edit-entry-form.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'dsa-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  DataType = DataType;

  categoriesMap: Map<string, string[]>;

  constructor(private dataService: DsaDataService,
              private userService: UserService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.userService.onUserChange().subscribe(() => {
      this.dataService.getCharactersByCategory().subscribe(data => {
        this.categoriesMap = data;
      });
    });
  }

  openNewForm() {
    const modalRef = this.modalService.open(EditEntryFormComponent);
    (<PermissionsFormComponent>modalRef.componentInstance).dataType = DataType.CHARACTER;

    modalRef.result.then(() => {
      this.dataService.updateEntries();
      setTimeout(() => {
          this.dataService.getCharactersByCategory().subscribe(data => {
            this.categoriesMap = data;
          });
        },
        2000);
    });
  }

}
