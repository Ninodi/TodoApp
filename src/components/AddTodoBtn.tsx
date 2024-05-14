import React from 'react'
import AddBtn from '../assets/icons/add-btn.png'
import { useDispatch} from 'react-redux'
import { AppDispatch} from '../store/store'
import { toggleTodoPopup } from '../store/popup/popup.slice'
import { selectTodo } from '../store/selectedTodo/selectedTodo.slice'

function AddTodoBtn() {
  const dispatch: AppDispatch = useDispatch()

  const addTodoPopup = () => {
    dispatch(toggleTodoPopup())
    dispatch(selectTodo('none'))
  }

  return (
    <div id='add-btn' onClick={addTodoPopup}>
        <img src={AddBtn} alt="" />
    </div>
  )
}

export default AddTodoBtn