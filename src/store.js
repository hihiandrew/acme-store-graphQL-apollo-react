import { createStore, applyMiddleware } from 'redux';
// import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

const initialState = {
  products: [],
  orders: [],
  orderId: '',
  auth: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default: return state;
  case SET_AUTH:
      return { ...state, auth: action.auth };
  case GET_ORDERS:
      const exists = action.orders.find(ord => ord.status == 'CART');
    const orderId = exists ?
      action.orders.find(ord => ord.status == 'CART').id : '';
    return {
      ...state,
      orders: action.orders,
      orderId,
    };
  case GET_PRODUCTS:
      return { ...state, products: action.products };
  case RESET_ALL:
      return { ...state, orders: [] };
  case CREATE_UPDATE_LINE:
      const newOrders = state.orders.map(o => {
      if (o.status == 'CART') {
        //if lineItem doesnt exist-> add lineItem
        if (!o.lineitems.find(i => i.id == action.lineItem.id)) {
          o.lineitems = [...o.lineitems, action.lineItem];
        }
        else {
          //exists -> update that lineItem
          o.lineitems.map(i => {
            if (i.id == action.lineItem.id) {
              //replace lineItem
              i = action.lineItem;
            }
          });
        }
      }
      return o;
    });
    return { ...state, orders: newOrders };
  case DELETE_ORDER:
      return { ...state,
      orders: state.orders.filter(o => o.id != action.orderId)
    }
  }


};

//action name
const GET_ORDERS = 'GET_ORDERS';
const GET_PRODUCTS = 'GET_PRODUCTS';
const RESET_ALL = 'RESET_ALL';
const CREATE_UPDATE_LINE = 'CREATE_UPDATE_LINE';
const SET_AUTH = 'SET_AUTH';
const DELETE_ORDER = 'DELETE_ORDER'

//action creator
const _setAuth = auth => {
  return {
    type: SET_AUTH,
    auth,
  };
};

const _getOrders = orders => {
  return {
    type: GET_ORDERS,
    orders,
  };
};

const _getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};

const _resetAll = () => {
  return {
    type: RESET_ALL,
  };
};

const _createUpdateLine = lineItem => {
  return {
    type: CREATE_UPDATE_LINE,
    lineItem,
  };
};

const _deleteOrder = orderId => {
  return {
    type: DELETE_ORDER,
    orderId
  }
}

//thunks
export const createUpdateLineItem = (id, change, orders) => {
  return dispatch => {
    const cart = orders.find(o => o.status == 'CART');
    const orderId = cart.id;
    const lineItem = cart.lineitems.find(i => i.productId == id);

    if (lineItem) {
      lineItem.quantity += change;
      axios
        .put(`/api/orders/${orderId}/lineItems/${lineItem.id}`, lineItem)
        .then(resp => dispatch(_createUpdateLine(resp.data)))
        .catch(console.error.bind(console));
    }
    else {
      axios
        .post(`/api/orders/${orderId}/lineItems/`, {
          orderId,
          productId: id,
        })
        .then(resp => dispatch(_createUpdateLine(resp.data)))
        .catch(console.error.bind(console));
    }
  };
};

export const exchangeTokenForAuth = history => {
  return dispatch => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      return;
    }
    return axios
      .get('/api/auth', {
        headers: {
          authorization: token,
        },
      })
      .then(response => response.data)
      .then(auth => {
        dispatch(_setAuth(auth));
        if (history) {
          history.push('/cart');
        }
      })
      .catch(ex => window.localStorage.removeItem('token'));
  };
};

export const logout = () => {
  window.localStorage.removeItem('token');
  return _setAuth({});
};

export const login = (credentials, history) => {
  return dispatch => {
    return axios
      .post('/api/auth', credentials)
      .then(response => response.data)
      .then(data => {
        window.localStorage.setItem('token', data.token);
        dispatch(exchangeTokenForAuth(history));
      });
  };
};

export const getOrders = () => {
  return dispatch => {
    return axios
      .get('/api/orders')
      .then(resp => {
        dispatch(_getOrders(resp.data));
        return resp.data;
      })
      .catch(console.error.bind(console));
  };
};

export const getProducts = () => {
  return dispatch => {
    return axios
      .get('/api/products')
      .then(resp => {
        dispatch(_getProducts(resp.data));
        return resp.data;
      })
      .catch(console.error.bind(console));
  };
};

export const resetAll = () => {
  return dispatch => {
    axios
      .delete('/api/orders/reset')
      .then(() => {
        return Promise.all([
          dispatch(_resetAll()),
          dispatch(getOrders()),
          dispatch(getProducts()),
        ]);
      })
      .catch(console.error.bind(console));
  };
};

export const createOrder = orders => {
  return dispatch => {
    const order = { ...orders.find(o => o.status == 'CART') }
    order.status = 'ORDER';
    axios
      .put(`/api/orders/${order.id}`, order)
      .then(() => dispatch(getOrders()))
      .catch(console.error.bind(console));
  };
};

export const deleteOrder = orderId => {
  return dispatch => {
    axios
      .delete(`/api/orders/${orderId}`)
      .then(() => { dispatch(_deleteOrder(orderId)) })
      .catch(console.error.bind(console))
  }
}

// export const store = createStore(
//   reducer,
//   applyMiddleware(loggerMiddleware, thunkMiddleware)
// );
export const store = createStore(reducer, applyMiddleware(thunkMiddleware));
