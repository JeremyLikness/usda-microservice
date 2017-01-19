/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppStateService } from './app-state.service';

describe('AppStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppStateService]
    });
  });

  it('should exist', inject([AppStateService], (service: AppStateService) => {
    expect(service).toBeTruthy();
  }));

  it('should initialiize descriptions', inject([AppStateService], (service: AppStateService) => {
    expect(service.descriptions).toBeDefined();
  }));
});
