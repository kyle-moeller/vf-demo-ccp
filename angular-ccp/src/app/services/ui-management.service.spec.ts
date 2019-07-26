import { TestBed } from '@angular/core/testing';

import { UiManagementService } from './ui-management.service';

describe('UiManagmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UiManagementService = TestBed.get(UiManagementService);
    expect(service).toBeTruthy();
  });
});
