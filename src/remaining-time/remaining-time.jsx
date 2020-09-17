import React from 'react'
import './remaining-time.style.scss'

export const RemainingTime = ({ eventHandler, placeHolder }) => {

    return (
        < input type="text" className='remaining-time-box' placeholder=" "
            onChange={eventHandler} />)
}
