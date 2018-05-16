class liveGame {
    constructor() {
        this.canvas = document.getElementById('canvas-area');
        //что за button, из названия не ясно поменяй имя.
        this.button = document.getElementById('start');
        this.ctx = this.canvas.getContext('2d');
        //если this.canvas.width будет 9, что произайдет?
        //10 вынеси в константу, если в коде встречается просто цифра это называется магическое число, хуй знает откуда оно и зачем вообще есть
        this.step = this.canvas.width / 10;
        // я думаю 2-е переменных ниже нужно переиминовать.
        this.cell = [];
        this.massNew = [];
        this.isStart = false;
    }

    init() {
        let self = this;
        //объявление слушателей вынести в отдельный метод
        //что за button, из названия не ясно поменяй имя.
        this.button = document.addEventListener('click', function () {
            this.isStart = true;
            // this.cell = self.firstCycle(); не понимаю зачем ты везде возвращаешь данные объекта ччерез ретурн
            // если можно работать на прямую с объектом.
            this.cell = self.firstCycle();
            console.log('init this.cell', this.cell);
            //зачем тут слип?
            self.sleep(600);
        });
    }

    //stop должен выставлять this.isStart в false ему не надо передавать параметр isStart
    stop(isStart) {
        // забыла let
        self = this;
        let neighbors = 0;
        for (let i = 0; i < self.step; i++) {
            for (let j = 0; j < self.step; j++) {
                if (this.cell[i][j] === 1) {
                    return;
                }
                neighbors = self.checkNeighbors(i, j);
                this.massNew = self.checkLive(this.massNew, neighbors, i, j);
                if (this.massNew[i][j] !== self.cell[i][j]) return;
            }
        }
        this.isStart = false;
    }

    //start должен выставлять this.isStart в true ему не надо передавать параметр isStart
    start(isStart) {
        console.log('start');
        //такие переменные лучше объявлять рядом с местом где они используются
        let count = 0;
        this.sleep(600);
        // что за newSelf где oldSelf или просто self
        let newSelf = this;
        //Опять получение данных через ретурн
        this.massNew = this.matrixArray(this.step, this.step);
        //setTimeout(this.goLive, 1000, this.cell, this.massNew, newSelf);
        while (count < 3) {
            //Тебе не надо передавать данные объекта если в том месте есть до них прямой доступ.
            this.cell = this.goLive(this.massNew, newSelf);
            count++;
            newSelf.sleep(600);
        }
    }

    firstCycle() {
        console.log('firstCycle');
        // тут есть и self и this почему так?
        let self = this;
        this.cell = this.matrixArray(this.step, this.step);
        this.cell[2][2] = 1;
        this.cell[2][3] = 1;
        this.cell[3][3] = 1;
        this.cell[4][4] = 1;
        this.cell[5][3] = 1;
        this.cell[5][4] = 1;
        this.cell[6][6] = 1;
        this.cell[7][6] = 1;
        this.cell[8][6] = 1;
        this.cell[7][9] = 1;

        for (let i = 0; i < this.step; i++) {
            for (let j = 0; j < this.step; j++) {
                if (self.cell[i][j] === 1) {
                    self.addCell(i, j);
                }
            }
        }
        //убери отседава старт его тут не должно быть
        //он должен вызываться из вне
        self.start(this.isStart);
        return this.cell;
    }

    sleep(ms) {
        ms += new Date().getTime();
        while (new Date() < ms) {
        }
    }

    goLive(massNew, newSelf) {
        let neighbors;
        // эти 2-а цикла очень похожи, не думаешь?
        //Посмотри что с этим можно сделать.
        for (let i = 1; i < newSelf.step - 1; i++) {
            for (let j = 1; j < newSelf.step - 1; j++) {
                neighbors = newSelf.checkNeighbors(i, j);
                massNew = newSelf.checkLive(massNew, neighbors, i, j);
            }
        }
        //методу скорее всего подходит название clearAll чем delete
        newSelf.delete();
        this.cell = massNew;
        for (let i = 0; i < newSelf.step; i++) {
            for (let j = 0; j < newSelf.step; j++) {
                if (massNew[i][j] === 1) {
                    newSelf.addCell(i, j);
                }
            }
        }
        //this.stop(this.isStart, this.cell);

        //тут ты возвращаешь this.cell и в месте где ты вызвала метод ты присваиваешь this.cell значение которое вернула.
        //2-я работа.
        return this.cell;
    }

    checkLive(massNew, neighbors, i, j) { //если метод или функция принимает больше 2-х параметров она уже считается плохой.
        //этот метод можно переделать что бы он просто возвращал rue || false в зависимосте от massNew[i][j] и neighbors которые в него переданы
        if (this.cell[i][j] === 0 && neighbors === 3) massNew[i][j] = 1;
        else if (this.cell[i][j] === 1 && (neighbors < 2 || neighbors > 3)) massNew[i][j] = 0;
        else if (this.cell[i][j] === 1 && (neighbors === 3 || neighbors === 2)) massNew[i][j] = 1;
        return massNew;
    }

    checkNeighbors(i, j) {
        let neighbors = 0;
        if (this.cell[i + 1][j] === 1) neighbors++;
        if (this.cell[i + 1][j + 1] === 1) neighbors++;
        if (this.cell[i + 1][j - 1] === 1) neighbors++;
        if (this.cell[i - 1][j] === 1) neighbors++;
        if (this.cell[i - 1][j + 1] === 1) neighbors++;
        if (this.cell[i - 1][j - 1] === 1) neighbors++;
        if (this.cell[i][j - 1] === 1) neighbors++;
        if (this.cell[i][j + 1] === 1) neighbors++;

    }

    addCell(x, y) {

        //ctxSize = this.canvas.width / this.canvas.width  / 10 ?
        let ctxSize = this.canvas.width / this.step;

        this.ctx.strokeRect(x * ctxSize, y * ctxSize, ctxSize, ctxSize);
    }

    //методу скорее всего подходит название clearAll чем delete
    delete() {
        //ctxSize = this.canvas.width / this.canvas.width  / 10 ?
        let ctxSize = this.canvas.width / this.step;
        console.log('delete');
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
    // тут init потом старт
    // слушателя можно повешать прямо тут.
    live.init();
};
