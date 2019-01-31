import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { UserService } from './user-service';
import { DatabaseService } from './database-service';
import { DataType } from './dsa-link/dsa-link.component';

@Injectable({
  providedIn: 'root',
})
export class DsaDataService {

  private characterEntries: Map<string, {name: string, category: string}>;
  private shipEntries: Map<string, {name: string, category: string}>;
  private locationEntries: Map<string, {name: string, category: string}>;
  private adventureEntries: Map<string, {name: string, category: string}>;

  constructor(private http: HttpClient,
              private userService: UserService,
              private dataBase: DatabaseService) {
    this.dataBase.getDataMap(DataType.CHARACTER).subscribe((map) => {
      this.characterEntries = map;
    });
    this.dataBase.getDataMap(DataType.ADVENTURE).subscribe((map) => {
      this.adventureEntries = map;
    });
    this.dataBase.getDataMap(DataType.SHIP).subscribe((map) => {
      this.shipEntries = map;
    });
    this.dataBase.getDataMap(DataType.LOCATION).subscribe((map) => {
      this.locationEntries = map;
    });
  }

  public getCharactersByCategory(): Observable<Map<string, string[]>> {
    return Observable.create(observer => {
      let characterCategories = new Map<string, string[]>();
      this.characterEntries.forEach((data, id) => {
        if (data['category']) {
          let current = characterCategories.get(data['category']);
          if (!current) {
            current = [];
          }
          current.push(id);
          characterCategories.set(data['category'], current);
        }
      });

      characterCategories = this.removeUnnecessaryCategories(DataType.CHARACTER, characterCategories);

      observer.next(characterCategories);
      observer.complete();
    });
  }

  public getAdventuresByCategory(): Observable<Map<string, string[]>> {
    return Observable.create(observer => {
      let adventureCategories = new Map<string, string[]>();
      this.adventureEntries.forEach((data, id) => {
        if (data['category']) {
          let current = adventureCategories.get(data['category']);
          if (!current) {
            current = [];
          }
          current.push(id);
          adventureCategories.set(data['category'], current);
        }
      });

      adventureCategories = this.removeUnnecessaryCategories(DataType.ADVENTURE, adventureCategories);

      observer.next(adventureCategories);
      observer.complete();
    });
  }

  public getShipsByCategory(): Observable<Map<string, string[]>> {
    return Observable.create(observer => {
      let shipCategories = new Map<string, string[]>();
      this.shipEntries.forEach((data, id) => {
        if (data['category']) {
          let current = shipCategories.get(data['category']);
          if (!current) {
            current = [];
          }
          current.push(id);
          shipCategories.set(data['category'], current);
        }
      });

      shipCategories = this.removeUnnecessaryCategories(DataType.SHIP, shipCategories);

      observer.next(shipCategories);
      observer.complete();
    });
  }

  public getLocationsByCategory(): Observable<Map<string, string[]>> {
    return Observable.create(observer => {
      let locationsCategory = new Map<string, string[]>();
      this.locationEntries.forEach((data, id) => {
        if (data['category']) {
          let current = locationsCategory.get(data['category']);
          if (!current) {
            current = [];
          }
          current.push(id);
          locationsCategory.set(data['category'], current);
        }
      });

      locationsCategory = this.removeUnnecessaryCategories(DataType.LOCATION, locationsCategory);

      observer.next(locationsCategory);
      observer.complete();
    });
  }

  removeUnnecessaryCategories(type: DataType, fullCategoriesMap): Map<string, string[]> {
    const categoriesMap = new Map<string, string[]>();
    fullCategoriesMap.forEach((ids, category) => {
      for (const id of ids) {
        this.maySeeData(type, id).subscribe(response => {
          if (response) {
            let current = categoriesMap.get(category);
            if (!current) {
              current = [];
            }
            current.push(id);
            categoriesMap.set(category, current);
          }
        });
      }
    });
    return categoriesMap;
  }

  public getName(searchId: string): string {
    let foundName = 'name unknown';
    this.characterEntries.forEach((data, id) => {
      if (id === searchId) {
        foundName = data['name'];
      }
    });
    this.shipEntries.forEach((data, id) => {
      if (id === searchId) {
        foundName = data['name'];
      }
    });
    this.locationEntries.forEach((data, id) => {
      if (id === searchId) {
        foundName = data['name'];
      }
    });
    this.adventureEntries.forEach((data, id) => {
      if (id === searchId) {
        foundName = data['name'];
      }
    });
    return foundName;
  }

  public hasPdf(id: string): Observable<boolean> {
    return Observable.create(observer => {
      const headers = new HttpHeaders({
        'Accept': 'application/pdf'
      });
      this.http.get('assets/pdf/' + id + '.pdf', {headers: headers, responseType: 'blob'}).subscribe((response) => {
          if (response.size > 10000) {
            observer.next(true);
          } else {
            observer.next(false);
          }
          observer.complete();
        },
        (error) => {
          console.log('pdf with id "' + id + '" does not exist');
        });
    });
  }

  public maySeeData(type: DataType, id: string): Observable<boolean> {
    return Observable.create(observer => {
      this.dataBase.getPermissions(type, id).subscribe((response) => {
        observer.next(this.userService.hasPermission(response));
        observer.complete();
      });
    });
  }

  public maySeePdf(type: DataType, id: string): Observable<boolean> {
    return Observable.create(observer => {
      this.dataBase.getPdfPermissions(DataType.CHARACTER, id).subscribe((response) => {
        observer.next(this.userService.hasPermission(response));
        observer.complete();
      });
    });
  }

  public getData(type: DataType, id: string, field: string):
    Observable<{'plain': any, 'linked': any, 'may_write': boolean, 'may_read': boolean}> {
    const result = new Subject<{'plain': string, 'linked': string, 'may_write': boolean, 'may_read': boolean}>();

    this.dataBase.getData(type, id, field).subscribe((data) => {
      const may_read = this.userService.hasPermission(data.read_permissions);
      const may_write = this.userService.hasPermission(data.write_permissions);
      result.next({
        'plain': may_read ? data.data : null,
        'linked': may_read ? this.insertLinks(data.data) : null,
        'may_write': may_write,
        'may_read': may_read
      });
      result.complete();
    });

    return result;
  }

  public storeData(type: DataType, id: string, field: string, data: any) {
    this.dataBase.storeData(type, id, field, data);
  }

  public insertLinks(text) {
    if (!text) {
      return null;
    }
    if (typeof text === 'object') {
      for (const key in text) {
        text[key] = this.insertLinks(text[key]);
      }
    } else if (typeof text === 'string') {
      this.characterEntries.forEach((data, id) => {
        let idx = text.indexOf('<' + id + '>');
        while (idx !== -1) {
          text = text.replace('<' + id + '>', '<a href="/characters/' + id + '">' + data['name'] + '</a>');
          idx = text.indexOf('<' + id + '>');
        }
      });
      this.shipEntries.forEach((data, id) => {
        let idx = text.indexOf('<' + id + '>');
        while (idx !== -1) {
          text = text.replace('<' + id + '>', '<a href="/ships/' + id + '">' + data['name'] + '</a>');
          idx = text.indexOf('<' + id + '>');
        }
      });
      this.locationEntries.forEach((data, id) => {
        let idx = text.indexOf('<' + id + '>');
        while (idx !== -1) {
          text = text.replace('<' + id + '>', '<a href="/locations/' + id + '">' + data['name'] + '</a>');
          idx = text.indexOf('<' + id + '>');
        }
      });
      this.adventureEntries.forEach((data, id) => {
        let idx = text.indexOf('<' + id + '>');
        while (idx !== -1) {
          text = text.replace('<' + id + '>', '<a href="/adventures/' + id + '">' + data['name'] + '</a>');
          idx = text.indexOf('<' + id + '>');
        }
      });
    }
    return text;
  }

}
