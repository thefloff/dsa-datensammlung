import { Component, OnInit } from '@angular/core';
import { DataType } from '../_shared/dsa-link/dsa-link.component';
import { DsaDataService } from '../_shared/dsa-data-service';
import { UserService } from '../_shared/user-service';

@Component({
  selector: 'dsa-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  DataType = DataType;

  categoriesMap: Map<string, string[]>;

  constructor(private dataService: DsaDataService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.onUserChange().subscribe(() => {
      this.dataService.getCharactersByCategory().subscribe(data => {
        this.categoriesMap = data;
      });
    });
  }

}
