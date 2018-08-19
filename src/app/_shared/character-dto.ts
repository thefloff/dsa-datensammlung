import { UserService } from './user-service';

export class CharacterDto {
  public id: string;
  public name: string;
  public description: string;
  public notes: string[];
  public backstory: string;
  public pdf: string;

  constructor() {}

  public fromJSON(userService: UserService, jsonData) {
    if (userService.canGet(jsonData, 'name')) {
      this.name = jsonData['name']['value'];
    }
    if (userService.canGet(jsonData, 'description')) {
      this.description = jsonData['description']['value'].join('\n');
    }
    if (userService.canGet(jsonData, 'backstory')) {
      this.backstory = jsonData['backstory']['value'].join('\n');
    }
    if (userService.canGet(jsonData, 'pdf')) {
      this.pdf = jsonData['pdf']['value'];
    }
    if (userService.canGet(jsonData, 'notes')) {
      this.notes = jsonData['notes']['value'];
    }
  }
}
