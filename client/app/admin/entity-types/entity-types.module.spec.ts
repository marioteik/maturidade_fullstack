import { EntitiesModule } from './entity-types.module';

describe('EntitiesModule', () => {
  let entitiesModule: EntitiesModule;

  beforeEach(() => {
    entitiesModule = new EntitiesModule();
  });

  it('should create an instance', () => {
    expect(entitiesModule).toBeTruthy();
  });
});
