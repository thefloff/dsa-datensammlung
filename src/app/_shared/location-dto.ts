import { UserService } from './user-service';

export class LocationDto {
  public id: string;
  public name: string;
  public notes: string[];
  public taverns: [string, string[]][] = [];
  public shops: [string, string[]][] = [];
  public temples: [string, string[]][] = [];
  public others: [string, string[]][] = [];

  constructor() {}

  public fromJSON(userService: UserService, jsonData) {
    if (userService.canGet(jsonData, 'name')) {
      this.name = jsonData['name']['value'];
    }
    if (userService.canGet(jsonData, 'notes')) {
      this.notes = jsonData['notes']['value'];
    }
    if (userService.canGet(jsonData, 'taverns')) {
      for (const tavern of jsonData['taverns']['value']) {
        if (!tavern['permissions'] || userService.hasPermission(tavern['permissions'])) {
          this.taverns.push([tavern['name'], tavern['notes'] ? tavern['notes'] : []]);
        }
      }
    }
    if (userService.canGet(jsonData, 'shops')) {
      for (const shop of jsonData['shops']['value']) {
        if (!shop['permissions'] || userService.hasPermission(shop['permissions'])) {
          this.shops.push([shop['name'], shop['notes'] ? shop['notes'] : []]);
        }
      }
    }
    if (userService.canGet(jsonData, 'temples')) {
      for (const temple of jsonData['temples']['value']) {
        if (!temple['permissions'] || userService.hasPermission(temple['permissions'])) {
          this.temples.push([temple['name'], temple['notes'] ? temple['notes'] : []]);
        }
      }
    }
    if (userService.canGet(jsonData, 'others')) {
      for (const other of jsonData['others']['value']) {
        if (!other['permissions'] || userService.hasPermission(other['permissions'])) {
          this.others.push([other['name'], other['notes'] ? other['notes'] : []]);
        }
      }
    }
  }
}
