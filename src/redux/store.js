import { configureStore } from '@reduxjs/toolkit'
import gameSlice from './slices/gameSlice'
import adminSlice from './slices/adminSlice'

export const store = configureStore({
    reducer: {
        creater: gameSlice,
        admin: adminSlice
    },
})

