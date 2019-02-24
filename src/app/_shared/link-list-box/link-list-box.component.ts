import {Component, Input, OnInit} from '@angular/core';
import {DsaDataService} from '../dsa-data-service';
import {PermissionsFormComponent} from '../permissions-form/permissions-form.component';
import {DataType} from '../dsa-link/dsa-link.component';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';

@Component({
  selector: 'dsa-link-list-box',
  templateUrl: './link-list-box.component.html',
  styleUrls: ['./link-list-box.component.css']
})
export class LinkListBoxComponent implements OnInit {
  @Input() dataName: string;
  @Input() dataType: DataType;
  @Input() entryType: DataType;
  @Input() dataId: string;
  @Input() dataField: string;

  DataType = DataType;

  editing = false;
  data: {
    'plain': string,
    'linked': string,
    'prepared': string,
  } = {
    'plain': '',
    'linked': '',
    'prepared': '',
  };
  hidden_data = [];
  may_write = false;
  may_read = false;
  isOwner = false;

  inputGroup: FormGroup;

  constructor(private dataService: DsaDataService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.loadData().subscribe(() => {});
    this.inputGroup = new FormGroup({
      commentInput: new FormControl()
    });
    this.dataService.isOwner(this.dataType, this.dataId).subscribe(result => {
      this.isOwner = result;
    });
  }

  prepareData(data: string[][]): Observable<string> {
    this.hidden_data = [];
    return Observable.create(observer => {
      if (!data) {
        observer.next('');
        observer.complete();
      }
      let prepared = '';
      for (const line of data) {
        this.dataService.maySeeData(this.entryType, line['name']).subscribe(result => {
          if (result) {
            let preparedLine = '';
            preparedLine += line['prefix'] ? line['prefix'] : '';
            preparedLine += ';';
            preparedLine += line['name'];
            preparedLine += ';';
            preparedLine += line['suffix'] ? line['suffix'] : '';
            preparedLine += '\n';
            prepared += preparedLine;
          } else {
            this.hidden_data.push(line);
          }
          observer.next(prepared);
          if (prepared.length > 0 && prepared.split('\n').length + this.hidden_data.length - 1 === data.length) {
            observer.complete();
          }
        });
      }
    });
  }

  deprepareData(input: string): string[][] {
    let data = [];
    for (const line of input.split('\n')) {
      if (line.length === 0) { continue; }
      const parts = line.split(';');
      data.push({
        'prefix': parts[0],
        'name': parts[1],
        'suffix': parts[2],
      });
    }
    data = data.concat(this.hidden_data);
    return data;
  }


  loadData(): Observable<object> {
    return Observable.create(observer => {
      this.dataService.getData(this.dataType, this.dataId, this.dataField).subscribe((data) => {
        this.prepareData(data.plain).subscribe(prepared => {
          this.data = {
            'plain': data.plain,
            'linked': data.linked,
            'prepared': prepared,
          };
          this.may_write = data.may_write;
          this.may_read = data.may_read;
        });
      });
      observer.next();
      observer.complete();
    });

  }

  startEdit() {
    this.inputGroup.controls['commentInput'].setValue(this.data.prepared);
    this.editing = true;
  }

  commit() {
    let value = this.inputGroup.controls['commentInput'].value;
    value = this.deprepareData(value);
    this.dataService.storeData(this.dataType, this.dataId, this.dataField, value);
    this.loadData().subscribe(() => {});
    this.editing = false;
  }

  abbort() {
    this.editing = false;
    this.loadData().subscribe(() => {});
    this.inputGroup.controls['commentInput'].setValue(this.data.prepared);
  }

  openPermissionsForm() {
    const modalRef = this.modalService.open(PermissionsFormComponent);
    (<PermissionsFormComponent>modalRef.componentInstance).dataType = this.dataType;
    (<PermissionsFormComponent>modalRef.componentInstance).id = this.dataId;
    (<PermissionsFormComponent>modalRef.componentInstance).field = this.dataField;
  }

}
