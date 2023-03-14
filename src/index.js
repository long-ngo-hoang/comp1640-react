import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import store, {persistor} from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { injectStore } from './redux/api';
const root = ReactDOM.createRoot(document.getElementById('root'));

injectStore(store)
injectStore(store)

root.render(
  <React.StrictMode>
        <Router>
        <Provider store={store}> 
        <PersistGate loading={null} persistor={persistor}>
        <App />    
        </PersistGate>
    </Provider>
    </Router>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
