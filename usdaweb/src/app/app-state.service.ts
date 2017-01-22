import { Injectable, EventEmitter } from '@angular/core';

export interface IDescription {
  id: number; 
  name: string;
  description: string;
}

export interface IGroup {
  id: number;
  name: string;
}

export interface IAppData {
  descriptions: IDescription[];
  groups: IGroup[];
}

@Injectable()
export class AppStateService implements IAppData {

  public onChanges: EventEmitter<IAppData>;
  public descriptions: IDescription[];
  public groups: IGroup[];

  constructor() {
    this.descriptions = [];
    this.groups = [];
    this.onChanges = new EventEmitter<IAppData>();
   }

   public updateDescriptions(descriptions: IDescription[]) {
     this.descriptions = [...descriptions];
     this.onChanges.emit(this);
   }

   public updateGroups(groups: IGroup[]) {
     this.groups = [...groups];
     this.onChanges.emit(this);
   }

}
