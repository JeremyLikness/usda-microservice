import { Component, OnInit, Inject } from '@angular/core';
import { AppStateService } from '../app-state.service';
import { Http } from '@angular/http';
import { Locator } from 'micro-locator';

@Component({
  selector: 'app-descriptions',
  templateUrl: './descriptions.component.html',
  styleUrls: ['./descriptions.component.css']
})
export class DescriptionsComponent implements OnInit {

  public endpoint: string;
  public error: string;

  constructor(public state: AppStateService, 
    locator: Locator,
    public http: Http) { 
      this.endpoint = locator.resolve('/descriptions');
    }

  ngOnInit() {
    if (this.state.descriptions.length < 1) {
      this.http.get(this.endpoint).subscribe(res => {
        this.state.descriptions = [...res.json()];
      }, err => {
        this.error = err;
      });
    }
  }

}
