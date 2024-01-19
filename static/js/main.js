import React from 'react';
import ReactDOM from 'react-dom';
import App from '../react/App';
import 'bootstrap';
import '../css/app.scss';


window.api.on("open-settings", (data) => {
    console.log(`Received ${data} from main process`);
});

ReactDOM.render(<App />, document.getElementById('app'));