import { Component, OnInit, Inject } from '@angular/core';
import { AppStateService, IDescription, IGroup } from '../app-state.service';
import { Http, URLSearchParams } from '@angular/http';
import { Locator } from 'micro-locator';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-descriptions',
  templateUrl: './descriptions.component.html',
  styleUrls: ['./descriptions.component.css']
})
export class DescriptionsComponent implements OnInit {

  public endpointDescriptions: string;
  public endpointGroups: string;
  public error: string;
  private _groupId: number = 0;
  public descriptions: IDescription[] = [];
  public groups: IGroup[] = [];
  public search: string = '';
  public searchChanged: Subject<string> = new Subject<string>();

  public get groupId(): number {
    return this._groupId; 
  }

  public set groupId(val: number) {
    let selected = Number(val);
    if (selected !== this._groupId) {
      this._groupId = selected;
      this.refreshDescriptions();
    }
  }

  constructor(public state: AppStateService, 
    locator: Locator,
    public http: Http) { 
      this.endpointDescriptions = locator.resolve('/descriptions');
      this.endpointGroups = locator.resolve('/groups');
      this.state.onChanges.subscribe(() => {
        this.groups = this.state.groups;
        this.descriptions = this.state.descriptions;
      });
      this.searchChanged  
        .debounceTime(300)
        .distinctUntilChanged()
        .subscribe(search => {
          this.search = search;
          this.refreshDescriptions();
        });
    }

  public changed(search: string) {
    this.searchChanged.next(search);
  }

  public refreshDescriptions() {
    if (this.search.length < 3 && this._groupId < 1) {
      return;
    }
    this.descriptions = [];
    this.error = '';
    let params = new URLSearchParams();
    if (this.search.length > 2) {
      params.set('search', this.search);
    }
    if (this._groupId) {
      params.set('groupId', this._groupId.toString());
    }
    this.http.get(this.endpointDescriptions, { search: params }).subscribe(res => {
      let descriptions = res.json() as IDescription[];
      this.state.updateDescriptions(descriptions);
    }, err => this.error = err);
  }

  ngOnInit() {
    if (this.groups.length < 1) {
      this.http.get(this.endpointGroups).subscribe(res => {
        let groups = res.json() as IGroup[];
        this.state.updateGroups(groups);
      }, err => this.error = err);
    }
  }

}
