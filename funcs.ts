import {IBall, IField, IVector} from "./types";

export const isHitBorder = (field: IField, ball: IBall) =>
    ball.position.x - ball.radius <= 0 || ball.position.x + ball.radius >= field.width
    || ball.position.y - ball.radius <= 0 || ball.position.y + ball.radius >= field.height;


export const hasCollision = (a: IBall, b: IBall) => {
    let dx = b.position.x - a.position.x;
    let dy = b.position.y - a.position.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    return  dist <= b.radius + a.radius
};

export const move = (ball: IBall) => {
        return Math.sqrt(ball.position.x * ball.force + ball.position.y * ball.force)
};

// export const start = (quantity: number, field: IField) => {
//     const balls = new Array(quantity).fill(null).map(x => constructBall(field))
// };

export const addVector = (vector1: IVector, vector2: IVector) : IVector => {
    return {
        x: vector1.x + vector2.x,
        y: vector1.y + vector2.y
    }
};

export const multiplyVector  = (vector: IVector, factor: number) : IVector => {
    return {
        x: vector.x * factor,
        y: vector.y * factor
    }
};

export const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min)
};

export const constructBall = (field: IField) => {
    let r = random(15, 30);
    let x = random(r, field.width - r);
    let y = random(r,  field.height - r);
    let id = random(0, 1000);
    console.log(id);
    return {
        position: {
            x,
            y
        },
        rotation: Math.atan2(y, x),
        force: random(1, 3),
        radius: r,
        id: id
    };
};

// export const loop = () => {
//     let field: IField = {
//         height: 500,
//         width: 1000
//
//     }
//     start(random(1, 5), field);
//     // сгенерить шары
//     // нарисовать
//     // отслеживать столкновения
//
// };

