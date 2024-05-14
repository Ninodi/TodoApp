import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTodoPopup } from '../store/popup/popup.slice'
import useRequest from '../hooks/useRequest'
import useFetch from '../hooks/useFetch'
import { addTodos, updateTodo } from '../store/todo/todo.slice'

function AddTodoPopup({onClose} : {onClose: () => void}) {
  const [title, setTitle] = useState<string>('')
  const [descr, setDescr] = useState<string>('')
  const dispatch: AppDispatch = useDispatch()
  const {sendRequest} = useRequest()
  const selectedTodo = useSelector((state: RootState) => state.selectedTodo.selectedTodo)
  const {fetchData, data: todos} = useFetch({endpoint: 'todos'})
  const currSelectedTodo = todos?.find(each => each._uuid === selectedTodo)
 

  useEffect(() => {
    if (currSelectedTodo) {
      setTitle(currSelectedTodo.title)
      setDescr(currSelectedTodo.descr || '')
    }
  }, [currSelectedTodo])

  const addTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      if(title){

        const data = {
          title: title,
          descr: descr,
        }

        //if selectedTodo is NOT none then show the update screen for todo
        if(selectedTodo === 'none'){
          sendRequest([data], 'POST')
          .then((res) => {
            dispatch(addTodos(res.items[0]))
            dispatch(toggleTodoPopup())
          })
        }else{
          sendRequest(data, 'PUT', selectedTodo)
          .then((res) => {
            dispatch(updateTodo(res))
            dispatch(toggleTodoPopup())
          })
        }
        
        setDescr('')
        setTitle('')
      }else return
  }

  return (
    <div className='popup'>
        <div className="popup-back" onClick={onClose}></div>
        <div id="popup">
            <div className="input-container">
                <label htmlFor="Title">Title</label>
                <input type="text" name='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="input-container">
                <label htmlFor="Description">Description</label>
                <input type="text" name='Description' value={descr} onChange={(e) => setDescr(e.target.value)}/>
            </div>
            <button id='add-todo' onClick={addTodo}>Add Todo</button>
        </div>
    </div>
  )
}

export default AddTodoPopup