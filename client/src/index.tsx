import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import store, { persistor } from './store/index';
import { io } from "socket.io-client";


export const socket = io("http://localhost:5000/");
socket.on("connect", () => {
  console.log(socket.id);
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>   
      </PersistGate>
      <App />
    </Provider>
  </BrowserRouter>
);