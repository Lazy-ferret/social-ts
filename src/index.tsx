import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// @ts-ignore
import App from './App.tsx'
import reportWebVitals from './reportWebVitals'
// @ts-ignore
import store from './redux/reduxStore.ts'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter >
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
)

reportWebVitals();
