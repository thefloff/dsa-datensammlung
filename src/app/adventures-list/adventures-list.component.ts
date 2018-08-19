import { Component, OnInit } from '@angular/core';
import { DataType } from '../_shared/dsa-link/dsa-link.component';

@Component({
  selector: 'dsa-adventures-list',
  templateUrl: './adventures-list.component.html',
  styleUrls: ['./adventures-list.component.css']
})
export class AdventuresListComponent implements OnInit {
  DataType = DataType;

  adventures = ['c01a01',
                'c01e02'];

  constructor() { }

  ngOnInit() {
  }

}
