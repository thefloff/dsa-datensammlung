import { UserService } from './user-service';

export class ShipDto {
  public id: string;
  public name: string;
  public damageNotes: string[];
  public image: string;
  public owner: string;
  public type: string;
  public masts: number;
  public armament: string;
  public armor: string;
  public captain: string;
  public cook: string;
  public nrCrew: number;
  public speedBack: number;
  public speedLeft: number;
  public speedRight: number;
  public speedFront: number;
  public mobility: number;

  constructor() {}

  public fromJSON(userService: UserService, jsonData) {
    if (userService.canGet(jsonData, 'name')) {
      this.name = jsonData['name']['value'];
    }
    if (userService.canGet(jsonData, 'damageNotes')) {
      this.damageNotes = jsonData['damageNotes']['value'];
    }
    if (userService.canGet(jsonData, 'image')) {
      this.image = jsonData['image']['value'];
    }
    if (userService.canGet(jsonData, 'owner')) {
      this.owner = jsonData['owner']['value'];
    }
    if (userService.canGet(jsonData, 'type')) {
      this.type = jsonData['type']['value'];
    }
    if (userService.canGet(jsonData, 'masts')) {
      this.masts = jsonData['masts']['value'];
    }
    if (userService.canGet(jsonData, 'armament')) {
      this.armament = jsonData['armament']['value'];
    }
    if (userService.canGet(jsonData, 'armor')) {
      this.armor = jsonData['armor']['value'];
    }
    if (userService.canGet(jsonData, 'captain')) {
      this.captain = jsonData['captain']['value'];
    }
    if (userService.canGet(jsonData, 'cook')) {
      this.cook = jsonData['cook']['value'];
    }
    if (userService.canGet(jsonData, 'nrCrew')) {
      this.nrCrew = jsonData['nrCrew']['value'];
    }
    if (userService.canGet(jsonData, 'speedBack')) {
      this.speedBack = jsonData['speedBack']['value'];
    }
    if (userService.canGet(jsonData, 'speedLeft')) {
      this.speedLeft = jsonData['speedLeft']['value'];
    }
    if (userService.canGet(jsonData, 'speedRight')) {
      this.speedRight = jsonData['speedRight']['value'];
    }
    if (userService.canGet(jsonData, 'speedFront')) {
      this.speedFront = jsonData['speedFront']['value'];
    }
    if (userService.canGet(jsonData, 'mobility')) {
      this.mobility = jsonData['mobility']['value'];
    }
  }
}
