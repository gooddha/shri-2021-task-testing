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

import { ProductShortInfo, Product } from '../../src/common/types';
import { initStore } from '../../src/client/store';
import { ExampleApi, CartApi } from '../../src/client/api';
import { Application } from '../../src/client/Application';


describe('Проверка страницы Catalog', () => {
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

  api.getProductById = async (id: number) => {
    return await Promise.resolve({
      data: {
        id,
        name: `Test product`,
        description: 'Test description',
        price: Number(1),
        color: 'Test color',
        material: 'Test material',
      }
    });
  }

  const cart = new CartApi();
  const store = initStore(api, cart);
  const history = createMemoryHistory({
    initialEntries: ['/catalog'],
    initialIndex: 0
  });

  describe('Проверка отображения списка товаров', () => {
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

  describe('Проверка страницы с подробной информацией о товаре', () => {

    it('На странице отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"', async () => {
      //@ts-ignore
      const application = (
        <Router history={history}>
          <Provider store={store}>
            <Application />
          </Provider>
        </Router>
      );

      const { findAllByTestId, getByText, getByRole } = render(application);
      await waitForElementToBeRemoved(() => getByText(/loading/i));

      const items = await findAllByTestId('1');
      const itemBody = items.filter(item => item.classList.contains('ProductItem'))[0];
      const itemLink = [...itemBody.getElementsByClassName('ProductItem-DetailsLink')][0];
      events.click(itemLink);
      await waitForElementToBeRemoved(() => getByText(/loading/i));

      const itemName = getByRole('heading', { name: /test product/i });
      const itemDescription = itemName.nextElementSibling;
      const itemPrice = itemDescription.nextElementSibling;
      const button = getByRole('button', { name: /add to cart/i });
      const color = getByText(/Color/).nextElementSibling;
      const material = getByText(/Material/).nextElementSibling;


      expect(itemName).toHaveTextContent('Test product');
      expect(itemDescription).toHaveTextContent('Test description');
      expect(itemPrice).toHaveTextContent('$1');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Add to Cart');
      expect(color).toHaveTextContent('Test color');
      expect(material).toHaveTextContent('Test material');



      screen.logTestingPlaygroundURL();
    });

  });


});