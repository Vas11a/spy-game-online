import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeValue } from '../redux/slices/adminSlice';
import Controller from './Controller';

export default function AdminPanel() {
  const dispatch = useDispatch();
  const { valueInput, isCorrectPass } = useSelector((state) => state.admin)
  return (
    <div>
      <h1 className="title">Admin Panel</h1>
      <input 
      type="text" 
      placeholder='enter password' 
      style={{width: '100%', marginTop:'20px'}}
      value={valueInput}
        onChange={(e) => dispatch(changeValue(e.target.value))}/>
        {
          isCorrectPass && (
            <Controller/>
          )
        }
    </div>
  )
}
