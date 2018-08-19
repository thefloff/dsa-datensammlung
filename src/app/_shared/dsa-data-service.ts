import { Injectable } from '@angular/core';
import { CharacterDto } from './character-dto';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { ShipDto } from './ship-dto';
import { UserService } from './user-service';
import { LocationDto } from './location-dto';
import { AdventureDto } from './adventure-dto';
import { DatabaseService } from './database-service';

@Injectable({
  providedIn: 'root',
})
export class DsaDataService {

  private characterEntries: Map<string, string> = new Map<string, string>([
    // players
    ['ramox', 'Ramox, Sohn des Topax'],
    ['bo', 'Boriane'],
    ['irion', 'Irion Treublatt'],
    ['laila', 'Laila saba Shabob'],
    ['lynn', 'Lynn Fuxfell'],
    ['salandrion', 'Salandrion Schattensprung'],
    // main
    ['aFinn', 'Albanach Finn'],
    ['motuiti', 'Motu-Iti'],
    // side
    ['dSassafras', 'Dragan Sassafras'],
    ['thor', 'Thor'],
    ['eKnitzing', 'Ettel Knitzing'],
    ['gilgamosh', 'Der große Gilgamosh']
  ]);

  private shipEntries: Map<string, string> = new Map<string, string>([
    ['moewe', 'Möwe'],
    ['birsel', 'Birsel'],
    ['desideria', 'Desideria'],
    ['MDW', 'Monarch des Westwinds'],
    ['uborasha', 'Uborasha']
  ]);

  private locationEntries: Map<string, string> = new Map<string, string>([
    ['kellun', 'Kellun'],
    ['neetha', 'Neetha']
  ]);

  private adventureEntries: Map<string, string> = new Map<string, string>([
    ['c01a01', '01 - Piratenangriff'],
    ['c01a02', '02 - TODO']
  ]);

  constructor(private http: HttpClient,
              private userService: UserService,
              private dataBase: DatabaseService) {}

  public getCharacter(id: string): Observable<CharacterDto> {
    return Observable.create(observer => {
      this.http.get('assets/data/characters/' + id + '.json').subscribe((response) => {
        if (response) {
          let character = null;
          if (this.userService.hasPermission(response['permissions'])) {
            character = new CharacterDto();
            character.fromJSON(this.userService, response);
            character.id = id;
            this.insertLinksToCharacter(character);
          }
          observer.next(character);
          observer.complete();
        }
      },
        (error) => {
          console.log('character with id "' + id + '" does not exist');
        });
    });
  }

  public getShip(id: string): Observable<ShipDto> {
    return Observable.create(observer => {
      this.http.get('assets/data/ships/' + id + '.json').subscribe((response) => {
        if (response) {
          let ship = null;
          if (this.userService.hasPermission(response['permissions'])) {
            ship = new ShipDto();
            ship.fromJSON(this.userService, response);
            ship.id = id;
            this.insertLinksToShip(ship);
          }
          observer.next(ship);
          observer.complete();
        }
      },
        (error) => {
          console.log('ship with id "' + id + '" does not exist');
        });
    });
  }

  public getLocation(id: string): Observable<LocationDto> {
    return Observable.create(observer => {
      this.http.get('assets/data/locations/' + id + '.json').subscribe((response) => {
        if (response) {
          let location = null;
          if (this.userService.hasPermission(response['permissions'])) {
            location = new LocationDto();
            location.fromJSON(this.userService, response);
            location.id = id;
            this.insertLinksToLocation(location);
          }
          observer.next(location);
          observer.complete();
        }
      },
        (error) => {
          console.log('location with id "' + id + '" does not exist');
        });
    });
  }

  public getAdventure(id: string): Observable<AdventureDto> {
    return Observable.create(observer => {
      this.http.get('assets/data/adventures/' + id + '.json').subscribe((response) => {
          if (response) {
            let adventure = null;
            if (this.userService.hasPermission(response['permissions'])) {
              adventure = new AdventureDto();
              adventure.fromJSON(this.userService, response);
              adventure.id = id;
              this.insertLinksToAdventure(adventure);
            }
            observer.next(adventure);
            observer.complete();
          }
        },
        (error) => {
          console.log('adventure with id "' + id + '" does not exist');
        });
    });
  }

  public getCharacterNotes(id: string): Observable<{'plain': string, 'linked': string}> {
    const result = new Subject<{'plain': string, 'linked': string}>();
    this.dataBase.getCharacterNotes(id).subscribe((data) => {
      result.next({'plain': data, 'linked': this.insertLinks(data)});
        result.complete();
      }
    );
    return result;
  }

  public setCharacterNotes(id: string, notes: string) {
    this.dataBase.storeCharacterNotes(id, notes);
  }

  public getShipNotes(id: string): Observable<{'plain': string, 'linked': string}> {
    const result = new Subject<{'plain': string, 'linked': string}>();
    this.dataBase.getShipNotes(id).subscribe((data) => {
      result.next({'plain': data, 'linked': this.insertLinks(data)});
        result.complete();
      }
    );
    return result;
  }

  public setShipNotes(id: string, notes: string) {
    this.dataBase.storeShipNotes(id, notes);
  }

  public getLocationNotes(id: string): Observable<{'plain': string, 'linked': string}> {
    const result = new Subject<{'plain': string, 'linked': string}>();
    this.dataBase.getLocationNotes(id).subscribe((data) => {
      result.next({'plain': data, 'linked': this.insertLinks(data)});
        result.complete();
      }
    );
    return result;
  }

  public setLocationNotes(id: string, notes: string) {
    this.dataBase.storeLocationNotes(id, notes);
  }

  public getAdventureNotes(id: string): Observable<{'plain': string, 'linked': string}> {
    const result = new Subject<{'plain': string, 'linked': string}>();
    this.dataBase.getAdventureNotes(id).subscribe((data) => {
        result.next({'plain': data, 'linked': this.insertLinks(data)});
        result.complete();
      }
    );
    return result;
  }

  public setAdventureNotes(id: string, notes: string) {
    this.dataBase.storeAdventureNotes(id, notes);
  }

  public insertLinks(text: string): string {
    if (!text) {
      return null;
    }
    this.characterEntries.forEach((name, id) => {
      let start = 0;
      while (text.indexOf('<' + id + '>', start) >= 0) {
        text = text.replace('<' + id + '>', '<a href="/characters/' + id + '">' +  name + '</a>');
        start = text.indexOf('<' + id + '>', start) + 1;
      }
    });
    this.shipEntries.forEach((name, id) => {
      let start = 0;
      while (text.indexOf('<' + id + '>', start) >= 0) {
        text = text.replace('<' + id + '>', '<a href="/ships/' + id + '">' +  name + '</a>');
        start = text.indexOf('<' + id + '>', start) + 1;
      }
    });
    this.locationEntries.forEach((name, id) => {
      let start = 0;
      while (text.indexOf('<' + id + '>', start) >= 0) {
        text = text.replace('<' + id + '>', '<a href="/locations/' + id + '">' +  name + '</a>');
        start = text.indexOf('<' + id + '>', start) + 1;
      }
    });
    this.adventureEntries.forEach((name, id) => {
      let start = 0;
      while (text.indexOf('<' + id + '>', start) >= 0) {
        text = text.replace('<' + id + '>', '<a href="/adventures/' + id + '">' +  name + '</a>');
        start = text.indexOf('<' + id + '>', start) + 1;
      }
    });
    return text;
  }

  private insertLinksToShip(ship: ShipDto): void {
    ship.captain = this.insertLinks(ship.captain);
    ship.owner = this.insertLinks(ship.owner);
    ship.cook = this.insertLinks(ship.cook);
    if (ship.damageNotes) {
      ship.damageNotes.forEach((value, index) => {
        ship.damageNotes[index] = this.insertLinks(value);
      });
    }
  }

  private insertLinksToCharacter(character: CharacterDto): void {
    character.backstory = this.insertLinks(character.backstory);
    character.description = this.insertLinks(character.description);
    if (character.notes) {
      character.notes.forEach((value, index) => {
        character.notes[index] = this.insertLinks(value);
      });
    }
  }

  private insertLinksToLocation(location: LocationDto): void {
    if (location.notes) {
      location.notes.forEach((value, index) => {
        location.notes[index] = this.insertLinks(value);
      });
    }

    if (location.taverns) {
      location.taverns.forEach((outerValue, outerIndex) => {
        outerValue[1].forEach((noteValue, noteIndex) => {
          location.taverns[outerIndex][1][noteIndex] = this.insertLinks(noteValue);
        });
      });
    }
  }

  private insertLinksToAdventure(adventure: AdventureDto): void {
    adventure.planning = this.insertLinks(adventure.planning);
    adventure.chronic = this.insertLinks(adventure.chronic);
    if (adventure.results) {
      adventure.results.forEach((value, index) => {
        adventure.results[index] = this.insertLinks(value);
      });
    }
  }
}
