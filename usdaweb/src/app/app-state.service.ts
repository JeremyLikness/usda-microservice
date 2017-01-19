import { Injectable } from '@angular/core';

@Injectable()
export class AppStateService {

  public descriptions: any[];

  constructor() {
    this.descriptions = [];
   }

}
