import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'dsa-ship-movement-view',
  templateUrl: './ship-movement-view.component.html',
  styleUrls: ['./ship-movement-view.component.css']
})
export class ShipMovementViewComponent implements OnInit {
  @Input() speed: {
    front: number,
    back: number,
    left: number,
    right: number,
    mobility: number,
  };

  constructor() { }

  ngOnInit() {
  }

}
