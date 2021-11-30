import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { akitaDevtools } from '@datorama/akita';
import Stats from './stats/stats';

ReactDOM.render(
    <React.StrictMode>
        <Stats/>
    </React.StrictMode>,
    document.getElementById('stats')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
akitaDevtools({});
