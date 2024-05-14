import { PayloadAction, createSlice} from '@reduxjs/toolkit'
import { ITodo } from '../../interface'


interface TodosState {
    todos: ITodo[];
  }
  
  const initialState: TodosState = {
    todos: [],
  }

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodos: (state, action: PayloadAction<ITodo | ITodo[]>) => {

          if (Array.isArray(action.payload)) {
            state.todos = []
            state.todos.push(...action.payload)
          } else {
            if (!action.payload.status) {
              state.todos.unshift(action.payload)
            } else {
              state.todos.push(action.payload)
            }
          }
        } ,
        updateTodo: (state, action: PayloadAction<ITodo>) => {
            const updatedTodo = action.payload
            const index = state.todos.findIndex(todo => todo._uuid === updatedTodo._uuid)
            if (index !== -1) {
                state.todos[index] = updatedTodo
            }
        }
    },
  })
  

  export const { addTodos, updateTodo } = todosSlice.actions
  export default todosSlice.reducer
