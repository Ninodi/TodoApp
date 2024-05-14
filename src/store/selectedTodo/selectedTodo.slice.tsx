import { PayloadAction, createSlice} from '@reduxjs/toolkit'

interface ISelectedTodo{
    selectedTodo: string
}


const initialState: ISelectedTodo = {
    selectedTodo: 'none',
}


const selectTodoSlice = createSlice({
    name: 'slecetedTodo',
    initialState,
    reducers: {
      selectTodo: (state, action: PayloadAction<string>) => {
        state.selectedTodo = action.payload
      },
    },
  })

export const { selectTodo } = selectTodoSlice.actions
export default selectTodoSlice.reducer