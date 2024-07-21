import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store'; // Update the path accordingly
import TodoApp from './components/todo.tsx'; // Update the path accordingly
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
};

export default App;
