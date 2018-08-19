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

  playerCharacters = ['ramox', 'salandrion', 'laila', 'irion', 'bo', 'lynn'];
  mainCharacters = ['aFinn', 'motuiti'];
  sideCharacters = ['dSassafras', 'thor', 'eKnitzing', 'gilgamosh'];

  canSeePlayerCharacters = false;
  canSeeMainCharacters = false;
  canSeeSideCharacters = false;

  constructor(private dataService: DsaDataService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(() => {
      this.updateVisibleCategories();
    })
  }

  updateVisibleCategories() {
    this.canSeePlayerCharacters = false;
    for (const item of this.playerCharacters) {
      this.dataService.getCharacter(item).subscribe((response) => {
        if (response) {
          this.canSeePlayerCharacters = true;
        }
      });
    }

    this.canSeeMainCharacters = false;
    for (const item of this.mainCharacters) {
      this.dataService.getCharacter(item).subscribe((response) => {
        if (response) {
          this.canSeeMainCharacters = true;
        }
      });
    }

    this.canSeeSideCharacters = false;
    for (const item of this.sideCharacters) {
      this.dataService.getCharacter(item).subscribe((response) => {
        if (response) {
          this.canSeeSideCharacters = true;
        }
      });
    }
  }

}
