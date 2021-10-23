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

describe('Should return product by ID', () => {
  const product = store.getProductById(0);

  it('Should be instance of Object', () => {
    expect(product).toBeInstanceOf(Object);
  });

  it('Should has id property', () => {
    expect(product).toHaveProperty('id', 0);
  });

  it('Should has name, description, price, color, material properties', () => {
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('description');
    expect(product).toHaveProperty('price',);
    expect(product).toHaveProperty('color');
    expect(product).toHaveProperty('material');
  });

});

describe('Should create order', () => {
  const order = {
    form: {
      name: 'Test',
      phone: '+77777777',
      address: 'Moscow',
    },
    cart: {}
  };

  const createOrder = store.createOrder(order);

  it('Should return ID with type number', () => {
    expect(typeof createOrder).toEqual('number');
  });

});

describe('Should return orders array', () => {
  const orders = store.getLatestOrders();

  it('Should be instance of Array', () => {
    expect(orders).toBeInstanceOf(Array);
  });

});