import { ExampleStore } from '../../src/server/data';

let store = new ExampleStore();

describe('Should return products list', () => {
  it('Should return array with 27 items', () => {
    expect(store.getAllProducts().length).toEqual(26);
  });
});