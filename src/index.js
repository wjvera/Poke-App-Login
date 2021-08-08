import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';


//importar un provider
import {Provider} from 'react-redux'

//importamos el generarTienda del component store
import generarTienda from './Redux/store'


const store = generarTienda()
ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


