/**
 * @jest-environment jsdom
 */

import { it, expect } from '@jest/globals';
import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import React from 'react';
import { initStore } from '../../src/client/store';
import { ExampleApi, CartApi } from '../../src/client/api';
import { Application } from '../../src/client/Application';
import events from '@testing-library/user-event';

describe('Проверка ссылок и страниц', () => {

  it('Проверка ссылок в навигации', () => {

    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    const application = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <Application />
        </Provider>
      </BrowserRouter>
    );

    const { getByRole } = render(application);

    const homeLink = getByRole('link', { name: /example store/i });
    const catalogLink = getByRole('link', { name: /catalog/i });
    const deliveryLink = getByRole('link', { name: /delivery/i });
    const contactsLink = getByRole('link', { name: /contacts/i });
    const cartLink = getByRole('link', { name: /cart/i });

    expect(homeLink).toHaveAttribute('href', '/hw/store/');
    expect(catalogLink).toHaveAttribute('href', '/hw/store/catalog');
    expect(deliveryLink).toHaveAttribute('href', '/hw/store/delivery');
    expect(contactsLink).toHaveAttribute('href', '/hw/store/contacts');
    expect(cartLink).toHaveAttribute('href', '/hw/store/cart');
  });



  it('По адресу /catalog должна открываться страница Catalog', () => {
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);
    const history = createMemoryHistory({
      initialEntries: ['/catalog'],
      initialIndex: 0
    })

    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    );

    const { getByRole } = render(application);
    const heading = getByRole('heading', { name: /catalog/i });

    expect(heading).toHaveTextContent('Catalog');
  });

  it('По адресу /delivery должна открываться страница Delivery', () => {
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);
    const history = createMemoryHistory({
      initialEntries: ['/delivery'],
      initialIndex: 0
    })

    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    );

    const { getByRole } = render(application);
    const heading = getByRole('heading', { name: /delivery/i });

    expect(heading).toHaveTextContent('Delivery');
  });




  it('По адресу /contacts должна открываться страница Contacts', () => {
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);
    const history = createMemoryHistory({
      initialEntries: ['/contacts'],
      initialIndex: 0
    })

    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    );

    const { getByRole } = render(application);
    const heading = getByRole('heading', {
      name: /contacts/i
    });

    expect(heading).toHaveTextContent('Contacts');
    screen.logTestingPlaygroundURL();
  });


  it('По адресу /cart должна открываться страница Cart', () => {
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);
    const history = createMemoryHistory({
      initialEntries: ['/cart'],
      initialIndex: 0
    })

    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    );

    const { getByRole } = render(application);
    const heading = getByRole('heading', {
      name: /cart/i
    });

    expect(heading).toHaveTextContent('Shopping cart');
    screen.logTestingPlaygroundURL();
  });


});
