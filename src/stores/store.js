'use strict';

import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const configureStore = compose( applyMiddleware(thunk) )(createStore);

export default configureStore;
