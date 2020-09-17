import React from 'react'
import './start-button.style.scss'

export const StartButton = ({ isRunning, stateHandler }) => {
    return (
        <div className={isRunning ? 'btn pause' : 'btn start'} onClick={
            stateHandler}>
            {isRunning ? 'Pause' : 'Start'}

        </div>
    )
}