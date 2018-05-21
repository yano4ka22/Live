class liveGame {
    constructor() {
        this.canvas = document.getElementById('canvas-area');
        this.buttonStart = document.getElementById('start');
        this.ctx = this.canvas.getContext('2d');
        this.scale = 10;
        //если this.canvas.width будет 9, что произайдет?
        //10 вынеси в константу, если в коде встречается просто цифра это называется магическое число, хуй знает откуда оно и зачем вообще есть
        this.step = this.canvas.width / this.scale;
        // я думаю 2-е переменных ниже нужно переиминовать.
        this.cells = [];
        this.subCells = [];
        this.isStart = false;
    }

    init() {
        let self = this;
        this.isStart = true;
        console.log('init this.cells', this.cells);
        this.firstCycle();
        //зачем тут слип?
        //self.sleep(600);
    }

    stop() {
        let self = this;
        let neighbors = 0;
        for (let i = 0; i < self.step; i++) {
            for (let j = 0; j < self.step; j++) {
                if (this.cells[i][j] === 1) {
                    return;
                }
                neighbors = self.checkNeighbors(i, j);
                this.subCells = self.checkLive(this.subCells, neighbors, i, j);
                if (this.subCells[i][j] !== self.cells[i][j]) return;
            }
        }
        this.isStart = false;
    }

    start() {
        console.log('start');
        this.sleep(600);
        let self = this;
        //Опять получение данных через ретурн
        this.subCells = this.matrixArray(this.step, this.step);
        //setTimeout(this.goLive, 1000, this.cells, this.subCells, newSelf);
        let count = 0;
        while (count < 3) {
            //Тебе не надо передавать данные объекта если в том месте есть до них прямой доступ.
            this.cells = this.goLive(self);
            count++;
            self.sleep(600);
        }
    }

    firstCycle() {
        console.log('firstCycle');
        // тут есть и self и this почему так?
        this.cells = this.matrixArray(this.step, this.step);
        this.cells[2][2] = 1;
        this.cells[2][3] = 1;
        this.cells[3][3] = 1;
        this.cells[4][4] = 1;
        this.cells[5][3] = 1;
        this.cells[5][4] = 1;
        this.cells[6][6] = 1;
        this.cells[7][6] = 1;
        this.cells[8][6] = 1;
        this.cells[7][9] = 1;

        let self = this;
        for (let i = 0; i < this.step; i++) {
            for (let j = 0; j < this.step; j++) {
                if (self.cells[i][j] === 1) {
                    self.addCell(i, j);
                }
            }
        }
    }

    sleep(ms) {
        ms += new Date().getTime();
        while (new Date() < ms) {
        }
    }

    goLive(newSelf) {
        let neighbors;
        // эти 2-а цикла очень похожи, не думаешь?
        //Посмотри что с этим можно сделать.
        for (let i = 1; i < newSelf.step - 1; i++) {
            for (let j = 1; j < newSelf.step - 1; j++) {
                neighbors = newSelf.checkNeighbors(i, j);
                this.subCells = newSelf.checkLive(this.subCells, neighbors, i, j);
            }
        }
        //методу скорее всего подходит название clearAll чем clearAll
        newSelf.clearAll();
        this.cells = this.subCells;
        for (let i = 0; i < newSelf.step; i++) {
            for (let j = 0; j < newSelf.step; j++) {
                if (this.subCells[i][j] === 1) {
                    newSelf.addCell(i, j);
                }
            }
        }
        //this.stop(this.isStart, this.cells);
    }

    checkLive(subCells, neighbors, i, j) { //если метод или функция принимает больше 2-х параметров она уже считается плохой.
        //этот метод можно переделать что бы он просто возвращал rue || false в зависимосте от subCells[i][j] и neighbors которые в него переданы
        if (this.cells[i][j] === 0 && neighbors === 3) subCells[i][j] = 1;
        else if (this.cells[i][j] === 1 && (neighbors < 2 || neighbors > 3)) subCells[i][j] = 0;
        else if (this.cells[i][j] === 1 && (neighbors === 3 || neighbors === 2)) subCells[i][j] = 1;
        return subCells;
    }

    checkNeighbors(i, j) {
        let neighbors = 0;
        if (this.cells[i + 1][j] === 1) neighbors++;
        if (this.cells[i + 1][j + 1] === 1) neighbors++;
        if (this.cells[i + 1][j - 1] === 1) neighbors++;
        if (this.cells[i - 1][j] === 1) neighbors++;
        if (this.cells[i - 1][j + 1] === 1) neighbors++;
        if (this.cells[i - 1][j - 1] === 1) neighbors++;
        if (this.cells[i][j - 1] === 1) neighbors++;
        if (this.cells[i][j + 1] === 1) neighbors++;

    }

    addCell(x, y) {

        //ctxSize = this.canvas.width / this.canvas.width  / 10 ?
        let ctxSize = this.canvas.width / this.step;

        this.ctx.strokeRect(x * ctxSize, y * ctxSize, ctxSize, ctxSize);
    }

    //методу скорее всего подходит название clearAll чем clearAll
    clearAll() {
        //ctxSize = this.canvas.width / this.canvas.width  / 10 ?
        let ctxSize = this.canvas.width / this.step;
        console.log('clearAll');
        //теперь я вообще не понимаю что за смысл ты вкладываешь в this.step!
        for (let i = 0; i < this.step; i++) {
            for (let j = 0; j < this.step; j++) {
                this.ctx.clearRect(i * ctxSize, j * ctxSize, ctxSize, ctxSize);
            }
        }
    }

    matrixArray(rows, columns) {
        // соблюдай везде нормальный стиль кода!
        let arr = [];
        for (let i = 0; i < rows; i++) {
            arr[i] = [];
            for (let j = 0; j < columns; j++) {
                arr[i][j] = 0;
            }
        }
        return arr;
    }
}

window.onload = function () {
    let live = new liveGame();
    let buttonStart = document.getElementById('start');
    console.log(buttonStart);
    buttonStart.addEventListener('click', function () {
        live.init();

        live.start();

    });
};
