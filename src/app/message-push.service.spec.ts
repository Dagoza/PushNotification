import { TestBed } from '@angular/core/testing';

import { MessagePushService } from './message-push.service';

describe('MessagePushService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessagePushService = TestBed.get(MessagePushService);
    expect(service).toBeTruthy();
  });
});
