import React from 'react'

import { render } from 'react-dom'
import { Provider } from 'react-redux'

import ReduxApp from './reducers/reducers';

import ReduxUIApp from './containers/App'
import configureStore from './stores/store';

let rootElement = document.getElementById('main')

const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(ReduxApp, preloadedState);

render(

    <Provider store = {store}>
      <ReduxUIApp />
    </Provider>,

    rootElement
)