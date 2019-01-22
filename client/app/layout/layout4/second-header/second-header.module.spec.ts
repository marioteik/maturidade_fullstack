import { SecondHeaderModule } from './second-header.module';

describe('SecondHeaderModule', () => {
  let secondHeaderModule: SecondHeaderModule;

  beforeEach(() => {
    secondHeaderModule = new SecondHeaderModule();
  });

  it('should create an instance', () => {
    expect(secondHeaderModule).toBeTruthy();
  });
});
