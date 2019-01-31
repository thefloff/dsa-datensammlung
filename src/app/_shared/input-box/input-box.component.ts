import { Component, Input, OnInit } from '@angular/core';
import { DataType } from '../dsa-link/dsa-link.component';
import { DsaDataService } from '../dsa-data-service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'dsa-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.css']
})
export class InputBoxComponent implements OnInit {
  @Input() dataName: string;
  @Input() dataType: DataType;
  @Input() dataId: string;
  @Input() dataField: string;

  editing = false;
  data: {
    'plain': string,
    'linked': string
  } = {
    'plain': '',
    'linked': ''
  };
  may_write = false;
  may_read = false;

  inputGroup: FormGroup;

  constructor(private dataService: DsaDataService) { }

  ngOnInit() {
    this.loadData();
    this.inputGroup = new FormGroup({
      commentInput: new FormControl()
    });
  }

  loadData() {
    this.dataService.getData(this.dataType, this.dataId, this.dataField).subscribe((data) => {
      this.data = {
        'plain': data.plain,
        'linked': data.linked
      };
      this.may_write = data.may_write;
      this.may_read = data.may_read;
    });
  }

  startEdit() {
    this.inputGroup.controls['commentInput'].setValue(this.data.plain);
    this.editing = true;
  }

  commit() {
    const value = this.inputGroup.controls['commentInput'].value;
    this.dataService.storeData(this.dataType, this.dataId, this.dataField, value);
    this.loadData();
    this.editing = false;
  }

  abbort() {
    this.editing = false;
    this.loadData();
    this.inputGroup.controls['commentInput'].setValue(this.data.plain);
  }

}
