import React from 'react'
import { useNavigate } from 'react-router-dom';
import './index.css'

export default function BtnBack() {
  const navigate = useNavigate()

  function clickBack() {
    navigate(-1);
  }

  return (
    <button onClick={clickBack} className='btn-back'>&#8592;</button>
  )
}
