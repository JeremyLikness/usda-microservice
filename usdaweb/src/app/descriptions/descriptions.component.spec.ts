/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Locator } from 'micro-locator';

import { DescriptionsComponent } from './descriptions.component';
import { AppStateService } from '../app-state.service';

describe('DescriptionsComponent', () => {
  let component: DescriptionsComponent;
  let fixture: ComponentFixture<DescriptionsComponent>;
  let locator = new Locator();
  locator.rebase('/', 'http://test/');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionsComponent ],
      providers: [ AppStateService, {
        provide: Locator, useValue: locator } ],
      imports: [ HttpModule, FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the endpoints', () => {
    expect(component.endpointDescriptions).toEqual('http://test/descriptions');
  })
});
