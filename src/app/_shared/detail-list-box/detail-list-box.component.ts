import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PermissionsFormComponent} from '../permissions-form/permissions-form.component';
import {DataType} from '../dsa-link/dsa-link.component';
import {DsaDataService} from '../dsa-data-service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';

@Component({
  selector: 'dsa-detail-list-box',
  templateUrl: './detail-list-box.component.html',
  styleUrls: ['./detail-list-box.component.css']
})
export class DetailListBoxComponent implements OnInit {
  @Input() dataName: string;
  @Input() dataType: DataType;
  @Input() dataId: string;
  @Input() dataField: string;

  DataType = DataType;
  Object = Object;

  openElement: string;
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
    return Observable.create(observer => {
      if (!data) {
        observer.next('');
        observer.complete();
      }
      let prepared = '';
      for (const line of data) {
        let preparedLine = '';
        preparedLine += line['name'] + ':';
        preparedLine += line['info'] ? '\n' + line['info'] + '\n;\n' : ';\n';
        prepared += preparedLine;
      }
      observer.next(prepared);
      observer.complete();
    });
  }

  deprepareData(input: string): string[][] {
    const data = [];
    for (const entry of input.split(';')) {
      if (entry.trim().length === 0) { continue; }
      const parts = entry.split(':');
      data.push({
        'name': parts[0],
        'info': parts[1].trim(),
      });
    }
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
