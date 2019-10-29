import { TestBed } from '@angular/core/testing';

import { OutputsService } from './outputs.service';

describe('OutputsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OutputsService = TestBed.get(OutputsService);
    expect(service).toBeTruthy();
  });
});
