import { AdminModule } from './admin.module';

describe('AdminModule', () => {
  let pagesModule: PagesModule;

  beforeEach(() => {
    pagesModule = new PagesModule();
  });

  it('should create an instance', () => {
    expect(pagesModule).toBeTruthy();
  });
});
