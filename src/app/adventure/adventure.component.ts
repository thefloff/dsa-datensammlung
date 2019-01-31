import { Component, OnInit } from '@angular/core';
import { UserService } from '../_shared/user-service';
import { ActivatedRoute } from '@angular/router';
import { DsaDataService } from '../_shared/dsa-data-service';
import { DataType } from '../_shared/dsa-link/dsa-link.component';

@Component({
  selector: 'dsa-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.css']
})
export class AdventureComponent implements OnInit {
  DataType = DataType;
  name: string;
  id: string;
  visible = false;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private dataService: DsaDataService) { }

  ngOnInit() {
    this.userService.onUserChange().subscribe(() => {
      this.route.paramMap.subscribe((map) => {
        this.id = map.get('id');
        this.dataService.maySeeData(DataType.ADVENTURE, this.id).subscribe(response => {
          this.visible = response;
        });
        this.name = this.dataService.getName(this.id);
      });
    });
  }

}
