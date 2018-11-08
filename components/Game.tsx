import React, {Component} from "react";
import Field from "./Field";
import {IBall, IField} from "../types";
import {addVector, constructBall, hasCollision, isHitBorder, multiplyVector} from "../funcs";
import Ball from "./Ball";
import {setInterval} from "timers";


export default class Game extends Component<GameProps, GameState> {

    time = null;
    timer = null;

    componentDidMount() {
        const field = {
            width: 1000,
            height: 500
        };
        this.setState({
            field,
            balls: new Array(this.props.ballsCount || 10).fill(null).map(x => constructBall(field))
        });
        if (this.timer === null)
            this.timer = setInterval(this.loop, 16)
    }

    componentWillUnmount() {
        if (this.timer !== null)
            clearInterval(this.timer);
    }

    render() {
        if (this.state === null)
            return <></>;

        return <Field field={this.state.field}>
            {this.state.balls.map((x, i) => <Ball key={i} ball={x}/>)}
        </Field>
    }

    loop = () => {
        let now = Date.now();
        let delta = now - this.time;

        this.setState({
            balls: this.move(this.state.balls)
        });

        this.time = now;
    }

    move = (balls: IBall[]) : IBall[] => {
        for (let i = 0; i <balls.length; i++){
            let ball = balls[i];


            if (isHitBorder(this.state.field, ball)) {
                ball.force = 2;
                ball.rotation -= Math.PI/2;
            }


            for (let b = 0; b < balls.length; b++) {
                if (b === i)
                    continue;

                if (false === hasCollision(ball, balls[b]))
                    continue;

                ball.rotation -= Math.PI / 2;
                balls[b].rotation -= Math.PI / 2
            }

            const vec = {
                x: Math.sin(ball.rotation),
                y: Math.cos(ball.rotation)
            };
            ball.position = addVector(ball.position, multiplyVector(vec, ball.force))
        }

            // if(isHitAnotherBall(balls, ball)){
            //     for(let i = 0; i < balls.length; i++){
            //         if(ball.id === balls[i].id){
            //             continue;
            //         }
            //         let dx = ball.position.x - balls[i].position.x;
            //         let dy = ball.position.y - balls[i].position.y;
            //         let dist = Math.sqrt(dx * dx + dy * dy);
            //
            //         let res = dist <= ball.radius + balls[i].radius;
            //         if(res){
            //             ball.rotation -= Math.PI / 2;
            //             balls[i].rotation += Math.PI / 2;
            //         }
            //
            //         ball.force *= -1;
            // }
            // ball.position = addVector(ball.position, multiplyVector(vec, ball.force * 1.5))

        // }
        return balls;
    }
}

export interface GameProps {
    ballsCount?: number
}

export interface GameState {

    field: IField,
    balls: IBall[]

}