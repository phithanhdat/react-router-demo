import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Root from './pages/Root';
import ErrorPage from './pages/error-page';
import ContactDetail, { deleteContact } from './pages/ContactDetail';
import { Provider } from 'react-redux';
import store from './redux/store'
import {loader as rootLoader } from './pages/Root'
import {loader as contactDetailLoader} from './pages/ContactDetail'
import {saveContactAction} from './pages/NewContact'
import NewContact from './pages/NewContact';
import DeleteDone from './pages/DeleteDone';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: 'contacts/:contactId',
        element: <ContactDetail />,
        loader: contactDetailLoader,
      },
      {
        path: 'contacts/:contactId/destroy',
        element: <DeleteDone />,
        action: deleteContact
      },
      {
        path: 'new-contact',
        element: <NewContact />,
        action: saveContactAction
      }
    ]
  },
  {
    path: '/about',
    element: <About />
  }
])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
