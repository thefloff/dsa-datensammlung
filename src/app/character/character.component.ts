import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DsaDataService } from '../_shared/dsa-data-service';
import { CharacterDto } from '../_shared/character-dto';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserService } from '../_shared/user-service';
import { DatabaseService } from '../_shared/database-service';
import { DataType } from '../_shared/dsa-link/dsa-link.component';

@Component({
  selector: 'dsa-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  DataType = DataType;
  character: CharacterDto;
  pdfUrl: SafeUrl;
  isCollapsed = true;

  constructor(private route: ActivatedRoute,
              private dataService: DsaDataService,
              private sanitizer: DomSanitizer,
              private userService: UserService,
              private database: DatabaseService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(() => {
      this.route.paramMap.subscribe((map) => {
        this.dataService.getCharacter(map.get('id')).subscribe((data) => {
          if (data) {
            this.character = data;
            if (this.character.pdf) {
              this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/pdf/' + this.character.pdf);
            }
          }
        });
      });
    });
  }

}
