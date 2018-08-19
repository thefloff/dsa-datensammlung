import { Component, Input, OnInit } from '@angular/core';
import { DataType } from '../dsa-link/dsa-link.component';
import { DsaDataService } from '../dsa-data-service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'dsa-comment-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.css']
})
export class InputBoxComponent implements OnInit {
  @Input() dataType: DataType;
  @Input() dataId: string;

  editing = false;
  data: {'plain': string, 'linked': string} = {'plain': '', 'linked': ''};

  inputGroup: FormGroup;

  constructor(private dataService: DsaDataService) { }

  ngOnInit() {
    this.loadData();
    this.inputGroup = new FormGroup({
      commentInput: new FormControl()
    });
  }

  loadData() {
    switch (this.dataType) {
      case DataType.CHARACTER:
        this.dataService.getCharacterNotes(this.dataId).subscribe((data) => {
          this.data = data;
        });
        break;
      case DataType.SHIP:
        this.dataService.getShipNotes(this.dataId).subscribe((data) => {
          this.data = data;
        });
        break;
      case DataType.LOCATION:
        this.dataService.getLocationNotes(this.dataId).subscribe((data) => {
          this.data = data;
        });
        break;
      case DataType.ADVENTURE:
        this.dataService.getAdventureNotes(this.dataId).subscribe((data) => {
          this.data = data;
        });
        break;
      default:
        break;
    }
  }

  startEdit() {
    this.inputGroup.controls['commentInput'].setValue(this.data.plain);
    this.editing = true;
  }

  commit() {
    const value = this.inputGroup.controls['commentInput'].value;

    switch (this.dataType) {
      case DataType.CHARACTER:
        this.dataService.setCharacterNotes(this.dataId, value);
        break;
      case DataType.SHIP:
        this.dataService.setShipNotes(this.dataId, value);
        break;
      case DataType.LOCATION:
        this.dataService.setLocationNotes(this.dataId, value);
        break;
      case DataType.ADVENTURE:
        this.dataService.setAdventureNotes(this.dataId, value);
        break;
      default:
        break;
    }

    this.loadData();
    this.editing = false;
  }

  abbort() {
    this.editing = false;
    this.loadData();
    this.inputGroup.controls['commentInput'].setValue(this.data.plain);
  }

}
