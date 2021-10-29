/**
 * @jest-environment jsdom
 */
import React from 'react';
import { Router } from 'react-router';

import { Provider, useSelector } from 'react-redux';
import { createMemoryHistory } from 'history';

import { it, expect } from '@jest/globals';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import events from '@testing-library/user-event';

import { ProductShortInfo } from '../../src/common/types';
import { initStore } from '../../src/client/store';
import { ExampleApi, CartApi } from '../../src/client/api';
import { Application } from '../../src/client/Application';
import { ProductItem } from '../../src/client/components/ProductItem';
import { ApplicationState } from '../../src/client/store';


describe('Проверка страницы Catalog', () => {
  describe('Проверка отображения списка товаров', () => {
    const basename = '/hw/store';
    const api = new ExampleApi(basename);

    api.getProducts = async () => {
      //@ts-ignore
      return await Promise.resolve<AxiosResponse<ProductShortInfo[], any>>({
        data: [
          {
            id: 1,
            name: `Test product 1`,
            price: Number(1)
          },
          {
            id: 2,
            name: `Test product 2`,
            price: Number(2)
          }
        ]
      });
    }

    const cart = new CartApi();
    const store = initStore(api, cart);
    const history = createMemoryHistory({
      initialEntries: ['/catalog'],
      initialIndex: 0
    });

    it('В каталоге должны отображаться товары, список которых приходит с сервера', async () => {
      const application = (
        <Router history={history}>
          <Provider store={store}>
            <Application />
          </Provider>
        </Router>
      );

      const { getByText } = render(application);
      await waitForElementToBeRemoved(() => getByText(/loading/i));
      const itemsWithTestIds = await screen.findAllByTestId(/[12]/);
      const filtered = itemsWithTestIds.filter(item => {
        return item.classList.contains('ProductItem')
      });

      expect(filtered).toHaveLength(2)
    });



    it('Для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре', async () => {

      const application = (
        <Router history={history}>
          <Provider store={store}>
            <Application />
          </Provider>
        </Router>
      );

      const { findAllByTestId, getByText } = render(application);
      await waitForElementToBeRemoved(() => getByText(/loading/i));

      const items = await findAllByTestId('1');
      const itemBody = items.filter(item => item.classList.contains('ProductItem'))[0];

      const itemName = [...itemBody.getElementsByClassName('ProductItem-Name')][0];
      const itemPrice = [...itemBody.getElementsByClassName('ProductItem-Price')][0];
      const itemLink = [...itemBody.getElementsByClassName('ProductItem-DetailsLink')][0];

      expect(itemName).toHaveTextContent('Test product 1');
      expect(itemPrice).toHaveTextContent('$1');
      expect(itemLink).toHaveAttribute('href', '/catalog/1');
    });
  });

});