import Arena from './arena'
import Player from './player'
import ReactDom from 'react-dom'

export default class Tetris {
    constructor(element, events) {
        this.element = element;
        this.canvas = element.querySelector('canvas');
        this.context = this.canvas.getContext('2d');
        this.context.scale(20, 20);

        this.arena = new Arena (12, 20);

        this.player = new Player(this);

        this.colors = [
            null,
            '#922b8c',
            '#fde100',
            '#f89622',
            '#015a9c',
            '#2cace2',
            '#4fb74b',
            '#ee2733',
        ]
        this.events = events

        let lastTime = 0;
        const update = (time = 0) => {
            const deltaTime = time - lastTime;
            lastTime = time;

            this.player.update(deltaTime);

            this.draw();
            requestAnimationFrame(update);
        }
        update();
    }

    updateScore (score = 0) {
        this.events.emit('updateScore', score)
    }

    draw () {
        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawMatrix(this.arena.matrix, {x: 0, y:0});
        this.drawMatrix(this.player.matrix, this.player.pos);
    }

    drawMatrix (matrix, offset) {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0){
                    this.context.fillStyle = this.colors[value];
                    this.context.fillRect(x + offset.x,
                                     y + offset.y,
                                     1, 1);
                }
            });
        });
    }
}