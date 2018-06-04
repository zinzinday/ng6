import { HelpDeskModule } from './help-desk.module';

describe('HelpDeskModule', () => {
  let helpDeskModule: HelpDeskModule;

  beforeEach(() => {
    helpDeskModule = new HelpDeskModule();
  });

  it('should create an instance', () => {
    expect(helpDeskModule).toBeTruthy();
  });
});
