import { Component, OnInit } from '@angular/core';
import { UserService } from '../_shared/user-service';
import { ActivatedRoute } from '@angular/router';
import { DsaDataService } from '../_shared/dsa-data-service';
import { AdventureDto } from '../_shared/adventure-dto';
import { DataType } from '../_shared/dsa-link/dsa-link.component';

@Component({
  selector: 'dsa-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.css']
})
export class AdventureComponent implements OnInit {
  DataType = DataType;

  adventure: AdventureDto;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private dataService: DsaDataService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(() => {
      this.route.paramMap.subscribe((map) => {
        this.dataService.getAdventure(map.get('id')).subscribe((data) => {
          if (data) {
            this.adventure = data;
          }
        });
      });
    });
  }

}
