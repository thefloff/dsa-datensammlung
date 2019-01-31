import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {DataType} from '../dsa-link/dsa-link.component';
import {DsaDataService} from '../dsa-data-service';

@Component({
  selector: 'dsa-permissions-form',
  templateUrl: './permissions-form.component.html',
  styleUrls: ['./permissions-form.component.css']
})
export class PermissionsFormComponent implements OnInit {
  @Input() dataType: DataType;
  @Input() id: string;
  @Input() field: string = null;

  may_read_meisterU: boolean;
  may_write_meisterU: boolean;
  owner_meisterU: boolean;
  may_read_meisterF: boolean;
  may_write_meisterF: boolean;
  owner_meisterF: boolean;

  may_read_bo: boolean;
  may_write_bo: boolean;
  owner_bo: boolean;
  may_read_irion: boolean;
  may_write_irion: boolean;
  owner_irion: boolean;
  may_read_laila: boolean;
  may_write_laila: boolean;
  owner_laila: boolean;
  may_read_lynn: boolean;
  may_write_lynn: boolean;
  owner_lynn: boolean;
  may_read_ramox: boolean;
  may_write_ramox: boolean;
  owner_ramox: boolean;
  may_read_rufus: boolean;
  may_write_rufus: boolean;
  owner_rufus: boolean;
  may_read_salandrion: boolean;
  may_write_salandrion: boolean;
  owner_salandrion: boolean;
  may_read_tsael: boolean;
  may_write_tsael: boolean;
  owner_tsael: boolean;

  may_read_spieler: boolean;
  may_write_spieler: boolean;
  owner_spieler: boolean;

  constructor(public activeModal: NgbActiveModal,
              private dataService: DsaDataService) { }

  ngOnInit() {
    this.dataService.getReadPermissions(this.dataType, this.id, this.field).subscribe(data => {
      const permissions = data;
      if ((<string[]>permissions).indexOf('meisterU') !== -1) {
        this.may_read_meisterU = true;
      }
      if ((<string[]>permissions).indexOf('meisterF') !== -1) {
        this.may_read_meisterF = true;
      }
      if ((<string[]>permissions).indexOf('bo') !== -1) {
        this.may_read_bo = true;
      }
      if ((<string[]>permissions).indexOf('irion') !== -1) {
        this.may_read_irion = true;
      }
      if ((<string[]>permissions).indexOf('laila') !== -1) {
        this.may_read_laila = true;
      }
      if ((<string[]>permissions).indexOf('lynn') !== -1) {
        this.may_read_lynn = true;
      }
      if ((<string[]>permissions).indexOf('ramox') !== -1) {
        this.may_read_ramox = true;
      }
      if ((<string[]>permissions).indexOf('rufus') !== -1) {
        this.may_read_rufus = true;
      }
      if ((<string[]>permissions).indexOf('salandrion') !== -1) {
        this.may_read_salandrion = true;
      }
      if ((<string[]>permissions).indexOf('tsael') !== -1) {
        this.may_read_tsael = true;
      }
      if ((<string[]>permissions).indexOf('spieler') !== -1) {
        this.may_read_spieler = true;
      }
    });

    if (this.field === null) {
      this.dataService.getOwners(this.dataType, this.id, this.field).subscribe(data => {
        const owners = data ? data : [];
        if ((<string[]>owners).indexOf('meisterU') !== -1) {
          this.owner_meisterU = true;
        }
        if ((<string[]>owners).indexOf('meisterF') !== -1) {
          this.owner_meisterF = true;
        }
        if ((<string[]>owners).indexOf('bo') !== -1) {
          this.owner_bo = true;
        }
        if ((<string[]>owners).indexOf('irion') !== -1) {
          this.owner_irion = true;
        }
        if ((<string[]>owners).indexOf('laila') !== -1) {
          this.owner_laila = true;
        }
        if ((<string[]>owners).indexOf('lynn') !== -1) {
          this.owner_lynn = true;
        }
        if ((<string[]>owners).indexOf('ramox') !== -1) {
          this.owner_ramox = true;
        }
        if ((<string[]>owners).indexOf('rufus') !== -1) {
          this.owner_rufus = true;
        }
        if ((<string[]>owners).indexOf('salandrion') !== -1) {
          this.owner_salandrion = true;
        }
        if ((<string[]>owners).indexOf('tsael') !== -1) {
          this.owner_tsael = true;
        }
        if ((<string[]>owners).indexOf('spieler') !== -1) {
          this.owner_spieler = true;
        }
      });
    }

    if (this.field !== null) {
      this.dataService.getWritePermissions(this.dataType, this.id, this.field).subscribe(data => {
        console.log(data);
        const permissions = data;
        if ((<string[]>permissions).indexOf('meisterU') !== -1) {
          this.may_write_meisterU = true;
        }
        if ((<string[]>permissions).indexOf('meisterF') !== -1) {
          this.may_write_meisterF = true;
        }
        if ((<string[]>permissions).indexOf('bo') !== -1) {
          this.may_write_bo = true;
        }
        if ((<string[]>permissions).indexOf('irion') !== -1) {
          this.may_write_irion = true;
        }
        if ((<string[]>permissions).indexOf('laila') !== -1) {
          this.may_write_laila = true;
        }
        if ((<string[]>permissions).indexOf('lynn') !== -1) {
          this.may_write_lynn = true;
        }
        if ((<string[]>permissions).indexOf('ramox') !== -1) {
          this.may_write_ramox = true;
        }
        if ((<string[]>permissions).indexOf('rufus') !== -1) {
          this.may_write_rufus = true;
        }
        if ((<string[]>permissions).indexOf('salandrion') !== -1) {
          this.may_write_salandrion = true;
        }
        if ((<string[]>permissions).indexOf('tsael') !== -1) {
          this.may_write_tsael = true;
        }
        if ((<string[]>permissions).indexOf('spieler') !== -1) {
          this.may_write_spieler = true;
        }
      });
    }
  }

  save() {
    const read_permissions: string[] = [];
    if (this.may_read_meisterU) { read_permissions.push('meisterU'); }
    if (this.may_read_meisterF) { read_permissions.push('meisterF'); }
    if (this.may_read_bo) { read_permissions.push('bo'); }
    if (this.may_read_irion) { read_permissions.push('irion'); }
    if (this.may_read_laila) { read_permissions.push('laila'); }
    if (this.may_read_lynn) { read_permissions.push('lynn'); }
    if (this.may_read_ramox) { read_permissions.push('ramox'); }
    if (this.may_read_rufus) { read_permissions.push('rufus'); }
    if (this.may_read_salandrion) { read_permissions.push('salandrion'); }
    if (this.may_read_tsael) { read_permissions.push('tsael'); }
    if (this.may_read_spieler) { read_permissions.push('spieler'); }
    this.dataService.setReadPermissions(this.dataType, this.id, this.field, read_permissions);

    if (this.field !== null) {
      const write_permissions: string[] = [];
      if (this.may_write_meisterU) {
        write_permissions.push('meisterU');
      }
      if (this.may_write_meisterF) {
        write_permissions.push('meisterF');
      }
      if (this.may_write_bo) {
        write_permissions.push('bo');
      }
      if (this.may_write_irion) {
        write_permissions.push('irion');
      }
      if (this.may_write_laila) {
        write_permissions.push('laila');
      }
      if (this.may_write_lynn) {
        write_permissions.push('lynn');
      }
      if (this.may_write_ramox) {
        write_permissions.push('ramox');
      }
      if (this.may_write_rufus) {
        write_permissions.push('rufus');
      }
      if (this.may_write_salandrion) {
        write_permissions.push('salandrion');
      }
      if (this.may_write_tsael) {
        write_permissions.push('tsael');
      }
      if (this.may_write_spieler) {
        write_permissions.push('spieler');
      }
      this.dataService.setWritePermissions(this.dataType, this.id, this.field, write_permissions);
    }

    if (this.field === null) {
      const owners: string[] = [];
      if (this.owner_meisterU) {
        owners.push('meisterU');
      }
      if (this.owner_meisterF) {
        owners.push('meisterF');
      }
      if (this.owner_bo) {
        owners.push('bo');
      }
      if (this.owner_irion) {
        owners.push('irion');
      }
      if (this.owner_laila) {
        owners.push('laila');
      }
      if (this.owner_lynn) {
        owners.push('lynn');
      }
      if (this.owner_ramox) {
        owners.push('ramox');
      }
      if (this.owner_rufus) {
        owners.push('rufus');
      }
      if (this.owner_salandrion) {
        owners.push('salandrion');
      }
      if (this.owner_tsael) {
        owners.push('tsael');
      }
      if (this.owner_spieler) {
        owners.push('spieler');
      }
      this.dataService.setOwners(this.dataType, this.id, owners);
    }

    this.activeModal.close();
  }

}
