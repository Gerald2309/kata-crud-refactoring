import React from 'react';
import Form from "./components/form";
import List from "./components/list";
import { StoreProvider } from "./store/store";


function App() {
  return <StoreProvider>
    <div className='container'>
    <h3>To-Do List</h3>
    <Form />
    <List />
    </div>
    
  </StoreProvider>
}

export default App;
