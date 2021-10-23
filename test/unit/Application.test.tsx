/**
 * @jest-environment jsdom
 */

import { it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { initStore } from '../../src/client/store';
import { ExampleApi, CartApi } from '../../src/client/api';
import { Application } from '../../src/client/Application';
import events from '@testing-library/user-event';


it('Tests links on home page', () => {

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

  const { container, getByRole } = render(application);

  const homeLink = getByRole('link', {
    name: /example store/i
  });

  const catalogLink = getByRole('link', {
    name: /catalog/i
  });

  const deliveryLink = getByRole('link', {
    name: /delivery/i
  });

  const contactsLink = getByRole('link', {
    name: /contacts/i
  });

  const cartLink = getByRole('link', {
    name: /cart/i
  });


  expect(homeLink).toHaveAttribute('href', '/hw/store/');
  expect(catalogLink).toHaveAttribute('href', '/hw/store/catalog');
  expect(deliveryLink).toHaveAttribute('href', '/hw/store/delivery');
  expect(contactsLink).toHaveAttribute('href', '/hw/store/contacts');
  expect(cartLink).toHaveAttribute('href', '/hw/store/cart');


  screen.logTestingPlaygroundURL();
});