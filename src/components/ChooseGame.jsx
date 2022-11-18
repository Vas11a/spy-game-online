import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clickGame, loadGames } from '../redux/slices/gameSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function ChooseGame() {
    const games = useSelector((state) => state.creater.games)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    React.useEffect(() => {
        dispatch(loadGames())
    }, [dispatch])
    const clickOnGame = async (id) => {
        const res = await axios.get(`https://6368e71615219b849609d6ae.mockapi.io/test/${id}`)
        if (+res.data.amount === res.data.totalPlayers) {
            return
        }
        navigate("/choose/cart")
        dispatch(clickGame(id))
        
    }
    return (
        <>
            <h1 className="title">Join game</h1>
            <div className="choose-game">
                {
                    games.map(elem => <div 
                    to='cart' 
                    className="block-game"
                    key={elem.id}
                        onClick={() => clickOnGame(elem.id)}>
                        <div className="game-name">{elem.roomName}</div>
                        <div className="players-amount">{elem.totalPlayers}/{elem.amount}</div>
                    </div>)
                }
            </div>
            <button onClick={() => navigate('/')} className="next">Home</button>
        </>
    )
}
