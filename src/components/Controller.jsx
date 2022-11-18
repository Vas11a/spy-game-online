import axios from 'axios'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAllGames, hideAllGame } from '../redux/slices/adminSlice'
import { useNavigate } from 'react-router-dom'

export default function Controller() {
    const navigate = useNavigate()
    const [id, setId] = React.useState(0)
    const dispatch = useDispatch()
    const { allgames } = useSelector((state) => state.admin)

    const getAll = async () => {
        const res = await axios.get(`https://6368e71615219b849609d6ae.mockapi.io/test`)
        dispatch(setAllGames(res.data))
    }
    const removeId = async () => {
        await axios.delete(`https://6368e71615219b849609d6ae.mockapi.io/test/${id}`)
    }

  return (
    <div style={{marginTop: '30px'}}>
        <a href='https://mockapi.io/projects/6368e71615219b849609d6af' target={'_blanc'} className="type">Mokapi io</a>
        <div onClick={getAll} className="type" >Get all games</div>
          <div onClick={() => dispatch(hideAllGame())} className="type" >Hide all games</div>
          {
            allgames.map((elem, idx) => <div key={elem.name+ idx} style={{padding: '10px 0'}}>
                <div>ID: {elem.id}</div>
                <div>Name: {elem.roomName}</div>
                <div>Amount: {elem.amount}</div>
                <div>Time: {elem.time}</div>
                <div>SpyId: {elem.spyId}</div>
                <div>Location: {elem.location}</div>
            </div>)
          }
            
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} style={{ width: '100%', margin: '20px 0' }} />
          <div onClick={removeId} className="type" style={{ outline: '2px solid red' }}>AЗ-5</div>
          <button onClick={() => navigate('/')} style={{marginTop: '15px'}} className="next">Home</button>
    </div>
  )
}
