import {Component, Input, OnInit} from '@angular/core';
import {DataType} from '../dsa-link/dsa-link.component';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DsaDataService} from '../dsa-data-service';

@Component({
  selector: 'dsa-edit-entry-form',
  templateUrl: './edit-entry-form.component.html',
  styleUrls: ['./edit-entry-form.component.css']
})
export class EditEntryFormComponent implements OnInit {
  @Input() dataType: DataType;
  @Input() id: string;
  @Input() name: string;
  @Input() category: string;
  @Input() creatingNew = true;

  constructor(public activeModal: NgbActiveModal,
              private dataService: DsaDataService) { }

  ngOnInit() {
  }

  save() {
    if (this.creatingNew) {
      this.dataService.createNewEntry(this.dataType, this.id, {name: this.name, category: this.category});
    } else {

    }

    this.activeModal.close();
  }

}
