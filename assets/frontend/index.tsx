import 'bootstrap';
import 'assets/frontend/services/logger.service';
import 'assets/plugins/sentry';
import React from 'react';
import ReactDOM from 'react-dom';
import ToggleColorMode from './App';
import reportWebVitals from './reportWebVitals';
import { akitaDevtools } from '@datorama/akita';
import { skillStore } from './store/skills/skill.store';
import { Skill } from './models/Skill';
import './windowExports';

skillStore.add(new Skill(0, 0, 'None'));

ReactDOM.render(
    <React.StrictMode>
        <ToggleColorMode/>
    </React.StrictMode>,
    document.getElementById('app'),
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
akitaDevtools({
    // logTrace: true,
});
