import { createSlice } from '@reduxjs/toolkit'
import { Movie } from '../types'

type ModalState = {
    isOpen: boolean,
    data: Movie
}

const initialState: ModalState = {
    isOpen: false,
    data: {} as Movie
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        open(state, action) {
            state.isOpen = true
            state.data = action.payload
        },
        close(state) {
            state.isOpen = false
            state.data = {} as Movie
        }
    }
})

export const { open, close } = modalSlice.actions
export default modalSlice.reducer