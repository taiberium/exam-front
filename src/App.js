import React from 'react';
//import './App.css';
import 'antd/dist/antd.css';
import {Provider} from 'react-redux';
import store from './store/store';
import LayoutComponent from "./component/LayoutComponent";

function App() {
    return (
        <Provider store={store}>
            <div className="App-header">
                <LayoutComponent/>
            </div>
        </Provider>
    );
}

export default App;
