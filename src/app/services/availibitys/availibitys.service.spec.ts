import { TestBed } from '@angular/core/testing';

import { AvailibitysService } from './availibitys.service';

describe('AvailibitysService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AvailibitysService = TestBed.get(AvailibitysService);
    expect(service).toBeTruthy();
  });
});
