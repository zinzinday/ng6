import { HelpdeskModule } from './helpdesk.module';

describe('HelpdeskModule', () => {
  let helpdeskModule: HelpdeskModule;

  beforeEach(() => {
    helpdeskModule = new HelpdeskModule();
  });

  it('should create an instance', () => {
    expect(helpdeskModule).toBeTruthy();
  });
});
