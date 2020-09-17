import React from 'react'
import './rest-time.style.scss'

export const RestTime = ({ restTime }) => {
    return (
        
        < span className="rest-time" > {new Date((restTime) * 1000).toISOString().substr(11, 8)}</span >
    )
}