class liveGame {
    constructor() {
        this.canvas = document.getElementById('canvas-area');
        this.gameArea = document.getElementById('game-area').getContext('2d');
        this.buttonName = document.getElementById('start');
        this.ctx = this.canvas.getContext('2d');
        this.sizeCell = 10;
        this.step = this.canvas.width / this.sizeCell;
        this.gameSpace = [];
        this.isStart = false;
    }

    // рисуем сетку
    init() {
        this.draw();
    }

    // событие клика, запускается игра
    start() {
        this.buttonName = document.addEventListener('click', () => {
            this.isStart = true;

            this.initGame();
        });
    }


    // инициализация первоначального состояния, запуск следующего шага каждую секунду
    initGame() {
        this.gameSpace = this.fillEmptyField(this.sizeCell);
        this.gameSpace[1][1] = true;
        this.gameSpace[1][2] = true;
        this.gameSpace[2][2] = true;
        this.gameSpace[2][3] = true;
        this.gameSpace[3][3] = true;
        this.gameSpace[4][4] = true;
        this.gameSpace[5][3] = true;
        this.gameSpace[5][4] = true;
        this.gameSpace[6][6] = true;
        this.gameSpace[7][6] = true;
        this.gameSpace[8][6] = true;
        this.gameSpace[7][9] = true;

        this.updateDrawing();

        let count = 4;
        setTimeout(() => {
            while(count > 0) {
                this.gameSpace = this.checkNeighbors();
                this.updateDrawing()
                /*const timerId = setInterval(() => this.updateDrawing(), 3000);
                setTimeout(() => {
                    clearInterval(timerId);
                }, 5000);
                count--;*/
            }
        }, 1000);

    }

    // заполнение массива пустыми ячейками
    fillEmptyField(step) {
        const field = [];
        for (let i = 0; i < step; i++){
            field[i] = [];
            for (let j = 0; j < step; j++){
                field[i][j] = false;
        }}

        return field;
    }

    // рисуем сетку
    draw() {
        for (let x = 0.5; x < this.canvas.width; x += this.step) {
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.width);
        }

        for (let y = 0.5; y < this.canvas.width; y += this.step) {
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
        }

        this.ctx.strokeStyle = "#888";
        this.ctx.stroke();
    };

    // проверка на соседей
    checkNeighbors() {
        console.log(this.gameSpace);
        const currentSpace = [];
        for (let i = 0; i < 9; i++){
            currentSpace[i] = [];
            for (let j = 0; j < 9; j++){
                currentSpace[i][j] = this.countNeighbors(i, j);
            }}

        return currentSpace;
    }

    // подсчет количества соседей у конкретной ячейки
    countNeighbors(i, j) {
        let neighbors = 0;
        if (i === 0) {
            if (this.gameSpace[i + 1][j] === true) neighbors++;
            if (this.gameSpace[i + 1][j + 1] === true) neighbors++;
            if (this.gameSpace[i + 1][j - 1] === true) neighbors++;
            if (this.gameSpace[i][j - 1] === true) neighbors++;
            if (this.gameSpace[i][j + 1] === true) neighbors++;
        } else if (i === this.step-1) {
            if (this.gameSpace[i - 1][j] === true) neighbors++;
            if (this.gameSpace[i - 1][j + 1] === true) neighbors++;
            if (this.gameSpace[i - 1][j - 1] === true) neighbors++;
            if (this.gameSpace[i][j - 1] === true) neighbors++;
            if (this.gameSpace[i][j + 1] === true) neighbors++;
        } else if (j === 0) {
            console.log(i, j);
            if (this.gameSpace[i + 1][j] === true) neighbors++;
            if (this.gameSpace[i + 1][j + 1] === true) neighbors++;
            if (this.gameSpace[i - 1][j] === true) neighbors++;
            if (this.gameSpace[i - 1][j + 1] === true) neighbors++;
            if (this.gameSpace[i][j + 1] === true) neighbors++;
        } else if (j === this.step-1) {
            if (this.gameSpace[i + 1][j] === true) neighbors++;
            if (this.gameSpace[i + 1][j - 1] === true) neighbors++;
            if (this.gameSpace[i - 1][j] === true) neighbors++;
            if (this.gameSpace[i - 1][j - 1] === true) neighbors++;
            if (this.gameSpace[i][j - 1] === true) neighbors++;
        } else {
            if (this.gameSpace[i + 1][j] === true) neighbors++;
            if (this.gameSpace[i + 1][j + 1] === true) neighbors++;
            if (this.gameSpace[i + 1][j - 1] === true) neighbors++;
            if (this.gameSpace[i - 1][j] === true) neighbors++;
            if (this.gameSpace[i - 1][j + 1] === true) neighbors++;
            if (this.gameSpace[i - 1][j - 1] === true) neighbors++;
            if (this.gameSpace[i][j - 1] === true) neighbors++;
            if (this.gameSpace[i][j + 1] === true) neighbors++;
        }

        if (neighbors < 2 || neighbors > 3) return false;
        else if (neighbors === 3) return true;
        else return this.gameSpace[i][j];
    }

    updateDrawing() {
        this.gameArea.clearRect(0, 0, this.canvas.width, this.canvas.width);

        for (let i = 0; i < 9; i += 1) {
            for (let j = 0; j < 9; j += 1) {
                if (this.gameSpace[i][j] === true) {
                    this.gameArea.fillRect(i * this.step, j * this.step, this.step + 1, this.step + 1);
                }
            }
        }
    }
}

window.onload = function () {
    let live = new liveGame();

    live.init();
    live.start();
};
