import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css"
import {Provider} from "react-redux"
import configureStore from "../src/reducers/store"
import {BrowserRouter} from "react-router-dom"
const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
   <BrowserRouter><Provider store = {store}><App/></Provider> </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
