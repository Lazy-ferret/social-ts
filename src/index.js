import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/reduxStore'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

    <BrowserRouter >
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>

);

// rerenderEntireTree()
// store.subscribe(() => {
//     let state = store.getState()
//     rerenderEntireTree(state)
// })

reportWebVitals();
