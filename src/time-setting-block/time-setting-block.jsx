import React from 'react'
import { RemainingTime } from '../remaining-time/remaining-time'
import './time-setting-block.style.scss'




export const TimeSettingBlock = ({ isRunning, isInSession, timeSetter, ...props }) => {
    let isDisplay = isInSession ? "hide" : ""
    return (
        < div className={"time-setting-block " + isDisplay} >
            <div className="time-block hours-input">
                <RemainingTime
                    eventHandler={
                        (e) => timeSetter(e, 'hours')
                    }
                    placeHolder="02"
                />
                <label className="block-label hr">Hr</label>
            </div>
            <span className="time-setting-block separator">:</span>
            <div className="time-block minutes-input">
                <RemainingTime
                    placeHolder="00"
                    eventHandler={
                        e => timeSetter(e, 'minutes')
                    } />
                <label className="block-label min">mins</label>
            </div>
        </div >
    )
}