import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'dsa-ship-movement-view',
  templateUrl: './ship-movement-view.component.html',
  styleUrls: ['./ship-movement-view.component.css']
})
export class ShipMovementViewComponent implements OnInit {
  @Input() speed_front = 0;
  @Input() speed_back = 0;
  @Input() speed_left = 0;
  @Input() speed_right = 0;
  @Input() maneuver = 3;

  constructor() { }

  ngOnInit() {
  }

}
