import { createSlice } from '@reduxjs/toolkit'
import { FavoriteMovie } from '../types'

type FeatureState = {
    data: FavoriteMovie[]
}

const initialState: FeatureState = {
    data: [] as FavoriteMovie[]
}

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        add(state, action) {
            state.data.push(action.payload)
        },
        del(state, action) {
            state.data = state.data.filter(movie => movie.id !== action.payload.id)
        }
    }
})

export const { add, del } = favoriteSlice.actions
export default favoriteSlice.reducer