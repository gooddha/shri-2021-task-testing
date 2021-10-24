/**
 * @jest-environment jsdom
 */
import { ProductShortInfo } from '../../src/common/types';
import { it, expect } from '@jest/globals';
import { render, screen, within, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import React from 'react';
import { initStore } from '../../src/client/store';
import { ExampleApi, CartApi } from '../../src/client/api';
import { Application } from '../../src/client/Application';
import events from '@testing-library/user-event';
import { commerce } from 'faker';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('Проверка страницы Catalog', () => {


  it('в каталоге должны отображаться товары, список которых приходит с сервера', async () => {
    const mock = new MockAdapter(axios);

    const basename = '/hw/store';
    const api = new ExampleApi(basename);

    api.getProducts = async () => {

      return await Promise.resolve<ProductShortInfo[]>([
        {
          id: 1,
          name: `${commerce.productAdjective()} ${commerce.product()}`,
          price: Number(commerce.price())
        },
        {
          id: 2,
          name: `${commerce.productAdjective()} ${commerce.product()}`,
          price: Number(commerce.price())
        }
      ]);
    }

    const cart = new CartApi();
    const store = initStore(api, cart);
    const history = createMemoryHistory({
      initialEntries: ['/catalog'],
      initialIndex: 0
    });

    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    );

    const { getByRole, getByText } = render(application);
    await waitForElementToBeRemoved(() => getByText(/loading/i));
    // const itemsWithTestIds = await screen.findAllByTestId(/1337000/);

    screen.logTestingPlaygroundURL();

  });

});