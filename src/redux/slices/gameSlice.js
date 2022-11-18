import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const addNewGame = createAsyncThunk(
    'game/addNewGame',
    async function (data, { getState, dispatch }) {
        const loca = getState().creater.locations
        const game = data;
        game.spyId = Math.floor(Math.random() * data.amount)+1
        game.location = loca[Math.floor(Math.random() * loca.length)]
        game.totalPlayers = 0
        await axios.post(`https://6368e71615219b849609d6ae.mockapi.io/test`, game)
        dispatch(setIsAdmin(true))
    }
)

export const clickGame = createAsyncThunk(
    'game/clickGame',
    async function (id,{dispatch, getState}) {
        const wasInRoom = getState().creater.yourEnter
        const res = await axios.get(`https://6368e71615219b849609d6ae.mockapi.io/test/${id}`)
        if (wasInRoom === 0) {
            dispatch(changeEnter(res.data.totalPlayers + 1))
        }
        dispatch(changeId(id))
        await axios.put(`https://6368e71615219b849609d6ae.mockapi.io/test/${id}`, { totalPlayers: res.data.totalPlayers+1})
    }
)

export const quitGame = createAsyncThunk(
    'game/quitGame',
    async function (_, { getState }) {
        const roomId = getState().creater.idCurrentGame
        const res = await axios.get(`https://6368e71615219b849609d6ae.mockapi.io/test/${roomId}`)
        await axios.put(`https://6368e71615219b849609d6ae.mockapi.io/test/${roomId}`, { totalPlayers: res.data.totalPlayers -1 })
    }
)



export const loadGames = createAsyncThunk(
    'game/loadGames',
    async function (_, {dispatch}) {
        const res = await axios.get(`https://6368e71615219b849609d6ae.mockapi.io/test`)
        dispatch(addGame(res.data))
    }
)







const initialState = {
    locations: ['База террористов', 'Банк', 'Школа', 'Цирк-шапито', 'Церковь', 'Университет', 'Хоккейная арена', 'Театр', 'Супермаркет', 'Станция техобслуживания', 'Спа-салон', 'Самолет', 'Ресторан', 'Посольство', 'Полярная станция', 'Полицейский участок', 'Подводная лодка', 'Пляж', 'Пиратский корабль', 'Пассажирский поезд', 'Партизанский отряд', 'Отель', 'Орбитальная станция', 'Океанский лайнер', 'Овощебаза', 'Ночной клуб', 'Лунапарк', 'Корпоративная вечеринка', 'Киностудия', 'Карнавал', 'Казино', 'Зоопарк', 'Войско крестоносцев', 'Выставка  настольных игр', 'Воинская часть', 'Больница'],
    games: [],
    idCurrentGame: 0,
    yourEnter: 0,
    isAdmin: false

}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        addGame(state, action) {
            state.games = action.payload
        },
        changeId(state, action) {
            state.idCurrentGame = action.payload
        },
        changeEnter(state, action) {
            state.yourEnter = action.payload
        },
        setIsAdmin(state,action) {
            state.isAdmin = action.payload
        }
    },
})


export const { addGame, changeId, changeEnter, setIsAdmin } = gameSlice.actions

export default gameSlice.reducer