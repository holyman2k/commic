import { applyMiddleware, createStore, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { routerMiddleware } from 'react-router-redux'
import { hashHistory } from 'react-router'
import reducers from './reducers/index.js'

const middleware = applyMiddleware(promise(), thunk, logger, routerMiddleware(hashHistory));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composedMiddleware = composeEnhancers(middleware);
export default createStore(reducers, composedMiddleware)

// export default createStore(reducers, middleware)