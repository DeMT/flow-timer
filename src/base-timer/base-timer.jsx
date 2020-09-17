import React from 'react'
import './base-timer.style.scss'
import { Component } from 'react'

class BaseTimer extends Component {

    componentDidMount() {
        this.r = 45
        this.totalLength = this.r * 2 * 3.1415

    }
    componentDidUpdate() {
        let { completedRatio } = this.props
        this.now_length = completedRatio * this.totalLength
    }

    render() {
        let { remaningTime, colorHandler } = this.props
        return (
            <div className="base-timer" >
                <svg className="base-timer__svg" viewBox="-50 -50 100 100">
                    <g className="base-timer__circle">
                        <circle className="base-timer__path-elapsed" r={this.r} />
                        <path
                            id="base-timer-path-remaining"
                            className={"base-timer__path-remaining " + colorHandler()}
                            strokeDasharray={`${this.now_length} ${this.totalLength}`}
                            d="
                        M 0, 100
                        m -45, 0
                        a 45,45 0 1,0 90,0
                        a 45,45 0 1,0 -90,0
                        "
                        ></path>
                    </g>
                </svg>
                <span className="base-timer__label">
                    {new Date((remaningTime) * 1000).toISOString().substr(11, 8)}
                </span>
            </div>
        )
    }
}
export default BaseTimer