import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState} from './store/store'
import TodoView from './components/TodoView';
import TodayDate from './components/TodayDate';
import './assets/styles/App.css'
import AddTodoBtn from './components/AddTodoBtn';
import AddTodoPopup from './components/AddTodoPopup';
import { toggleTodoPopup } from './store/popup/popup.slice';

function App() {
  const isPopupOpen = useSelector((state: RootState) => state.popup.isPopupOpen)
  const dispatch: AppDispatch = useDispatch()
  
  return (
    <div className="app-container">
      <div className='header'>
        <TodayDate />
        <AddTodoBtn/>
      </div>
      <TodoView />
      {isPopupOpen && <AddTodoPopup onClose={() => dispatch(toggleTodoPopup())} />}
    </div>
  );
}

export default App;
