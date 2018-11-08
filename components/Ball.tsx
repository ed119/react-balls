import React, {Component} from "react";
import {IBall} from "../types";

export default class Ball extends Component<BallProps>
{

    render() {
        const ball = this.props.ball;
        const style = {
            width: ball.radius * 2,
            height: ball.radius * 2,
            top: ball.position.y - ball.radius,
            left: ball.position.x - ball.radius
        };

        return <div className='ball' style={style}/>
    }

}

export interface BallProps {

    ball: IBall

}