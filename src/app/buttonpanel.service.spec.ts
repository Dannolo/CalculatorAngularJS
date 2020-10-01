import { TestBed } from '@angular/core/testing';

import { ButtonpanelService } from './buttonpanel.service';

describe('ButtonpanelService', () => {
  let service: ButtonpanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ButtonpanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
