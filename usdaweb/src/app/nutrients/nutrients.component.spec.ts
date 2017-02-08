/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Locator } from 'micro-locator';
import { AppStateService } from '../app-state.service';

import { NutrientsComponent } from './nutrients.component';

describe('NutrientsComponent', () => {
  let component: NutrientsComponent;
  let fixture: ComponentFixture<NutrientsComponent>;

  let locator = new Locator();
  locator.rebase('/', 'http://test/');

  beforeEach(async(() => {
    
    TestBed.configureTestingModule({
      declarations: [ NutrientsComponent ],
      imports: [ HttpModule, FormsModule ],
      providers: [ AppStateService, {
        provide: Locator, useValue: locator } ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutrientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
