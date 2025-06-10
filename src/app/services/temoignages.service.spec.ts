import { TestBed } from '@angular/core/testing';

import { TemoignagesService } from './temoignages.service';

describe('TemoignagesService', () => {
  let service: TemoignagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemoignagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
