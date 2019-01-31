import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DsaDataService } from '../_shared/dsa-data-service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserService } from '../_shared/user-service';
import { DataType } from '../_shared/dsa-link/dsa-link.component';

@Component({
  selector: 'dsa-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  DataType = DataType;
  pdfUrl: SafeUrl;
  isCollapsed = true;
  name: string;
  id: string;
  visible = false;

  constructor(private route: ActivatedRoute,
              private dataService: DsaDataService,
              private sanitizer: DomSanitizer,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.onUserChange().subscribe(() => {
      this.route.paramMap.subscribe((map) => {
        this.id = map.get('id');
        this.dataService.maySeeData(DataType.CHARACTER, this.id).subscribe(response => {
          this.visible = response;
        });
        this.name = this.dataService.getName(this.id);
        this.dataService.maySeePdf(DataType.CHARACTER, this.id).subscribe((maySeePdf) => {
          if (maySeePdf) {
            this.dataService.hasPdf(this.id).subscribe((hasPdf) => {
              if (hasPdf) {
                this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl( 'assets/pdf/' + this.id + '.pdf');
              }
            });
          }
        });
      });
    });
  }

}
