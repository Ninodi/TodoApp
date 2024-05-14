import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { toggleTodoPopup } from '../store/popup/popup.slice';
import { ITodo } from '../interface';
import { selectTodo } from '../store/selectedTodo/selectedTodo.slice';
import useRequest from '../hooks/useRequest';
import { addTodos} from '../store/todo/todo.slice';

interface ITodoProps extends ITodo {
  active: boolean
  setActive: (id: string) => void
  data: ITodo
}

function TodoItem({active, setActive, id, title, descr, status, data} : ITodoProps) {
  const dispatch: AppDispatch = useDispatch()
  const {sendRequest} = useRequest()
  const allTodos = useSelector((state: RootState) => state.todos.todos)
  const [checked, setChecked] = useState<boolean>(status || false)

  const onEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation() //stop toggle effect on the button click
    dispatch(toggleTodoPopup())
    dispatch(selectTodo(id || 'none'))
  }

  const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation() //stop toggle effect on the button click
    const updatedStatus = e.target.checked
    setChecked(updatedStatus)

    sendRequest({ status: updatedStatus }, 'PUT', id)
    .then((res) => {
      const currTodoIndex = allTodos.findIndex(each => each._uuid === id)
      const updatedTodos = [...allTodos]
      updatedTodos[currTodoIndex] = res

      //if status is changed to done move todo to the end of the array, else move it to the top
      if(updatedStatus){
        updatedTodos.push(updatedTodos.splice(currTodoIndex, 1)[0])
      }else{
        const [movedTodo] = updatedTodos.splice(currTodoIndex, 1)
        updatedTodos.unshift(movedTodo)
      }
      dispatch(addTodos(updatedTodos))
    })
  }

  const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation() //stop toggle effect on the button click

    sendRequest(null, 'DELETE', id)
    .then(() => {
      const updatedTodos = allTodos.filter(todo => todo._uuid !== id)
      dispatch(addTodos(updatedTodos))
    })
  }

  return (
  <div className={`todo-item ${active ? 'active' : ''}`} onClick={() => setActive(id ?? '')} style={{backgroundColor: `${checked ? "#c1f4db": "#e1c5a8"}`}}>
      <div className="todo-title">
        {title}
      </div>
      <p className="todo-descr">
        {descr}
      </p>
      <div className="controls">
        <div className="buttons-container">
          <button className='edit-btn' onClick={onEdit}>Edit</button>
          <button className='delete-btn' onClick={onDelete}>Delete</button>
        </div>
        <label className="custom-checkbox">
          <input type="checkbox" checked={checked} onChange={onCheck} />
          <span className="checkmark"></span>
        </label>
      </div>
    </div>
  )
}

export default TodoItem


