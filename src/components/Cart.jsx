import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { quitGame, changeEnter, setIsAdmin } from '../redux/slices/gameSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Cart() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [penCard, setOpenCard] = React.useState(false)
  const [text, setText] = React.useState('')
  const { idCurrentGame, yourEnter, isAdmin } = useSelector((state) => state.creater)

  const leaveGame = async () => {
    await dispatch(quitGame())
    navigate("/choose")
  }
  const openCard = async () => {
    if (text !== '') return
    const res = await axios.get(`https://6368e71615219b849609d6ae.mockapi.io/test/${idCurrentGame}`)
    if (+res.data.amount === res.data.totalPlayers) {
      setOpenCard(true)
      if (yourEnter === res.data.spyId) {
        setText('Ты шпион')
      } else {
        setText(res.data.location)
      }
      if (isAdmin === true) {
        setTimeout(() => {
          alert('time passed!!')
        }, +(res.data.time + '000'));
      }
    } else {
      return
    }
  }
  const finishGame = async () => {
    navigate("/choose")
    dispatch(changeEnter(0))
    if (isAdmin === true) {
      await axios.delete(`https://6368e71615219b849609d6ae.mockapi.io/test/${idCurrentGame}`)
      dispatch(setIsAdmin(false))
      setText('')
    }
  }
  return (
    <>
          <h1 className="title">Open</h1>
      <div className={`card ${penCard ? 'addCard' : ''}`} ><div className='insideCard'>{text}</div></div>
          <div className="bb" style={{display: 'flex', gap:'10px', flexWrap:'wrap', justifyContent: 'center'}}>
            <button onClick={leaveGame}  className="next">Quit</button>
            <button onClick={openCard}className="next">Next</button>
            <button onClick={finishGame} className="next">Finish game</button>
          </div>
    </>
  )
}
