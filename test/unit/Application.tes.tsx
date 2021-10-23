import { it, expect } from '@jest/globals';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { initStore } from '../../src/client/store';
import { ExampleApi, CartApi } from '../../src/client/api';
import { Application } from '../../src/client/Application';
import events from '@testing-library/user-event';


it('первый тест реакт компонентов', () => {

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

  const { container, } = render(application);



});