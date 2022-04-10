import './App.css';
import React from 'react';
import AppNavBar from './components/AppNavBar';
import ShoppingList from './components/ShoppingList';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <AppNavBar/>
      <ShoppingList/>
     <h1>Hello world from Anass</h1>
    </div>
  );
}

export default App;
