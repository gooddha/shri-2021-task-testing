import { ExampleStore } from '../../src/server/data';

let store = new ExampleStore();

describe('Should return products list', () => {
  const products = store.getAllProducts();

  it('Should be instance of Array', () => {
    expect(products).toBeInstanceOf(Array);
  });

  it('Should return array with length grater than 0', () => {
    expect(products.length).toBeGreaterThan(0);
  });
});

describe('Should return product by id', () => {
  const product = store.getProductById(0);

  it('Should be instance of Object', () => {
    expect(product).toBeInstanceOf(Object);
  });

  it('Should has id property', () => {
    expect(product).toHaveProperty('id', 0);
  });

});