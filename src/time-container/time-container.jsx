import React, { Component } from 'react'
import './time-container.style.scss'
import { StartButton } from '../start-button/start-button'
import { TimeSettingBlock } from '../time-setting-block/time-setting-block'
import BaseTimer from '../base-timer/base-timer'
import { RestTime } from '../rest-time/rest-time'
class TimeContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isRunning: false,
            remaning_time: 0,
            resting_time: 0,
            set_hr: 0,
            set_min: 0,
            set_total_time: 0,
            isInSession: false,
        }
        this.rest_time_out_id = 0
        this.running_time_out_id = 0
        let bell_sound_url = 'http://soundbible.com/grab.php?id=2218&type=wav'
        this.audio = new Audio(bell_sound_url);
    }
    componentDidUpdate(prevProps, prevState) {
        document.getElementsByTagName('title')[0].innerHTML = new Date((this.state.remaning_time) * 1000).toISOString().substr(11, 8)
        if (this.state.isRunning) {
            if (this.state.set_hr > 0 | this.state.set_min > 0) {
                this.starting_time = Date.now()
                let result_time = this.state.set_hr * 3600 + this.state.set_min * 60
                this.setState({ remaning_time: result_time, set_hr: 0, set_min: 0, resting_time: 60, isInSession: true, set_total_time: result_time })
                return true
            }

            if (prevState.isRunning !== this.state.isRunning) {
                this.starting_time = Date.now()
            }

            // clear timeout from the rest phase, directly kill any timeout that still living.
            clearTimeout(this.running_time_out_id)
            clearTimeout(this.rest_time_out_id)
            this.running_time_out_id = setTimeout(this.oneSecondStep, 500)

            if (this.state.resting_time < 60) {
                this.setState({ resting_time: 60 })
            }
        }
        // deal with the resting time timeout problem, directly kill all last timeout 
        //since phase changing should cancel other timeout.
        if (!this.state.isRunning & this.state.isInSession) {
            clearTimeout(this.rest_time_out_id)
            clearTimeout(this.running_time_out_id)
            this.rest_time_out_id = setTimeout(this.restingStep, 500)
        }
    }

    oneSecondStep = () => {
        if (this.state.remaning_time > 0) {
            let delta_time = (Date.now() - this.starting_time) / 1000
            this.setState({ remaning_time: this.state.remaning_time - delta_time, resting_time: this.state.resting_time + delta_time / 5 })
            this.starting_time = Date.now()

        }
        else if (this.state.remaning_time <= 0) {
            this.setState({ isInSession: false, isRunning: false })
        }
    }
    restingStep = () => {

        let { resting_time } = this.state
        if (resting_time > 0) {
            let delta_time = (Date.now() - this.starting_time) / 1000
            this.setState({ resting_time: resting_time - delta_time })
            this.starting_time = Date.now()
        }
        else if (resting_time <= 0) {

            this.audio.play();
            this.setState({ isRunning: true, resting_time: 60 })

        }
    }


    progressCaculator = () => {
        let { remaning_time, set_total_time, isInSession } = this.state
        if (!isInSession) {
            return 'grey'
        }
        if ((remaning_time / set_total_time) > 0.5) {
            return 'start'
        }
        else if (remaning_time / set_total_time > 0.25) {
            return 'middle'
        }
        else {
            return 'end'
        }
    }

    timerRemaningLengthCaculator = () => {
        let timeLeftRaito = this.state.remaning_time / this.state.set_total_time
        let finalRatio = timeLeftRaito - (1 / this.state.set_total_time) * (1 - timeLeftRaito)
        return finalRatio
    }

    render() {

        return (
            <div className={`time-container${this.state.isRunning ? "__running" : ""}`}>
                < BaseTimer remaningTime={this.state.remaning_time}
                    colorHandler={this.progressCaculator}
                    completedRatio={this.timerRemaningLengthCaculator()} />
                <RestTime restTime={this.state.resting_time} />
                <TimeSettingBlock isRunning={this.state.isRunning} isInSession={this.state.isInSession} timeSetter={(e, unit) => {
                    e.target.value = e.target.value.replace(/\D+/g, '')
                    if (unit === 'hours') {
                        this.setState({ set_hr: e.target.value })
                    }
                    if (unit === 'minutes') {
                        this.setState({ set_min: e.target.value })
                    }


                }} />

                <StartButton isRunning={this.state.isRunning} stateHandler={
                    e => this.setState({ isRunning: !this.state.isRunning })
                } />
                <div className="proceeding-tasks"></div>
            </div >
        )
    }

}
export default TimeContainer;
