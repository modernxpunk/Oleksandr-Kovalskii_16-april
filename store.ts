import { configureStore } from '@reduxjs/toolkit'
import favoriteSlice from './features/favoriteSlice'

import modalSlice from './features/modalSlice'

const rootReducer = {
    reducer: {
        modal: modalSlice,
        favorite: favoriteSlice
    }
}

const store = configureStore(rootReducer)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store