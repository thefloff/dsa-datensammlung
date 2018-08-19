import { UserService } from './user-service';

export class AdventureDto {
  public id: string;
  public name: string;
  public planning: string;
  public chronic: string;
  public results: string[];

  constructor() {}

  public fromJSON(userService: UserService, jsonData) {
    if (userService.canGet(jsonData, 'name')) {
      this.name = jsonData['name']['value'];
    }
    if (userService.canGet(jsonData, 'planning')) {
      this.planning = jsonData['planning']['value'].join('\n');
    }
    if (userService.canGet(jsonData, 'chronic')) {
      this.chronic = jsonData['chronic']['value'].join('\n');
    }
    if (userService.canGet(jsonData, 'results')) {
      this.results = jsonData['results']['value'];
    }
  }
}
