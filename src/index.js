import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import events from 'events';

const eventEmitter = new events.EventEmitter();

ReactDOM.render(<App events={eventEmitter} />, document.getElementById('root'));
registerServiceWorker();
