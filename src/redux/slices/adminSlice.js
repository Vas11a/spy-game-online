import { createSlice } from '@reduxjs/toolkit'




const initialState = {
    valueInput: '',
    isCorrectPass: false,
    allgames: []
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        changeValue(state, action) {
            state.valueInput = action.payload
            if (state.valueInput === 'admin721') {
                state.isCorrectPass = true
            } else {
                state.isCorrectPass = false
            }
        },
        setAllGames(state, action) {
            state.allgames = action.payload
        },
        hideAllGame(state) {
            state.allgames = []
        }
    },
})


export const { changeValue, setAllGames, hideAllGame } = adminSlice.actions

export default adminSlice.reducer