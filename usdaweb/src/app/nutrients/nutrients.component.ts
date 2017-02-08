import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'; 
import { Locator } from 'micro-locator';
import { AppStateService } from '../app-state.service';

@Component({
  selector: 'app-nutrients',
  templateUrl: './nutrients.component.html',
  styleUrls: ['./nutrients.component.css']
})
export class NutrientsComponent implements OnInit {

  private endpointNutrients: string;
  private nutrientInfo: any = null;
  private id: number = 0;
  private gramWeight: number = 0;
  private error: string = '';

  constructor(public state: AppStateService, 
    locator: Locator,
    public http: Http) { 
      this.endpointNutrients = locator.resolve('/nutrients');
      this.state.onChanges.subscribe(newState => this.changes());
     }

  ngOnInit() {
    this.id = this.state.foodId;
  }

  changes() {
    if (this.state.foodId && this.state.foodId !== this.id) {
      this.id = this.state.foodId;
      this.error = 'Loading...';
      this.http.get(`${this.endpointNutrients}${this.id}`).subscribe(res => {
        this.nutrientInfo = res.json();
        this.gramWeight = this.nutrientInfo.weights[0]['gram-weight'];
        this.error = '';
      }, err => this.error = err);
    }
  }

}
