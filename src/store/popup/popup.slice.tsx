import { createSlice} from '@reduxjs/toolkit'

interface PopupState {
    isPopupOpen: boolean
}


const initialState: PopupState = {
    isPopupOpen: false,
}


const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
      toggleTodoPopup: (state) => {
        state.isPopupOpen = !state.isPopupOpen
      },
    },
  })

export const { toggleTodoPopup } = popupSlice.actions
export default popupSlice.reducer