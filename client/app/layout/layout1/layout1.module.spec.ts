import { Layout1Module } from './layout1.module';

describe('Layout1Module', () => {
  let layout1Module: Layout1Module;

  beforeEach(() => {
    layout1Module = new Layout1Module();
  });

  it('should create an instance', () => {
    expect(layout1Module).toBeTruthy();
  });
});
