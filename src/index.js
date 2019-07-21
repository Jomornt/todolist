import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList';
import { Provider } from 'react-redux'
import store from './store'
import { GlobalStyle } from './style.js'

const App = (
    <Provider store={store}>
        <GlobalStyle/>
        <TodoList></TodoList>
    </Provider>
)
ReactDOM.render(App, document.getElementById('root'));
