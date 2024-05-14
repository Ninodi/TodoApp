import React, { useEffect, useState } from 'react'
import TodoItem from './TodoItem'
import { ITodo } from '../interface'
import useFetch from '../hooks/useFetch'
import { AppDispatch, RootState } from '../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { addTodos } from '../store/todo/todo.slice'

function TodoView() {
  const allTodos = useSelector((state: RootState) => state.todos.todos)
  const [activeTodo, setActiveTodo] = useState<string | null>(null)
  const {fetchData} = useFetch({endpoint: 'todos'})
  const dispatch: AppDispatch = useDispatch()

  const handleSetActive = (id: string) => {
    setActiveTodo(id === activeTodo ? '' : id)
  }

  useEffect(() => {
    const getData = async () => {
      const res = await fetchData()
      res.items.reverse().forEach((each: ITodo) => {
        dispatch(addTodos(each))
      })
    }
  
    getData()

  }, [dispatch, fetchData])


  return (
    <div className='todos-container'>
      {allTodos?.map((each, index) => (
        <TodoItem 
          key={index + (each._uuid ?? '')} 
          title={each.title}
          descr={each.descr}
          id={each._uuid}
          active={each._uuid === activeTodo}
          status={each.status}
          setActive={handleSetActive}
          data={each}
          />
      ))}
    </div>
  )
}

export default TodoView

