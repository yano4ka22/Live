class liveGame {
    init() {
        let canvas = document.getElementById('canvas-area');
        let ctx = canvas.getContext('2d');
        //setTimeout(self.startPlay, 300, canvas, ctx, self);
        this.startPlay(canvas, ctx);
    }
    startPlay(canvas, ctx){
        let self = this;
        //let button = document.getElementById('start');
        let step = canvas.width / 10;
        let cell = self.matrixArray(step,step);
        cell[2][2] = 1;
        cell[2][3] = 1;
        cell[3][3] = 1;
        cell[4][4] = 1;

        
        for (let i = 0; i < step; i++){
            for (let j = 0; j < step; j++) {
                if (cell[i][j] === 1) {
                    (function(i) {
                        setTimeout(function(){
                            self.addCell( i, j );
                        }, 1000);
                    })(i);
                }
            }
        }
        this.sleep(1000);
        let newSelf = this;
        setTimeout(this.goLive, 1000, ctx, cell, newSelf);
        //this.goLive(ctx, cell);

    }
    sleep (ms) {
        ms += new Date().getTime();
        while (new Date() < ms){}
    }
    goLive(ctx, cell, newSelf){
        console.log('goLive');
        console.log(newSelf);
        let canvas = document.getElementById('canvas-area');
        let step = canvas.width / 10;
        let massNew = newSelf.matrixArray(step,step);
        for (let i = 1; i < step-1; i++) {
            for (let j = 1; j < step-1; j++) {
                let neighbors = 0;
                if (cell[i+1][j] === 1) neighbors++;
                if (cell[i+1][j+1] === 1) neighbors++;
                if (cell[i+1][j-1] === 1) neighbors++;
                if (cell[i-1][j] === 1) neighbors++;
                if (cell[i-1][j+1] === 1) neighbors++;
                if (cell[i-1][j-1] === 1) neighbors++;
                if (cell[i][j-1] === 1) neighbors++;
                if (cell[i][j+1] === 1) neighbors++;

                if (cell[i][j] === 0 && neighbors === 3 ) massNew[i][j] = 1;
                else if (cell[i][j] === 1 && !(neighbors === 3 || neighbors === 2)) massNew[i][j] = 0;
                else if (cell[i][j] === 1 ) massNew[i][j] = 1;
            }
        }
        newSelf.delete();
        cell = massNew;
        for (let i = 0; i < step; i++){
            for (let j = 0; j < step; j++) {
                if (cell[i][j] === 1) {
                    newSelf.addCell( i, j );
                }
            }
        }
    }
    addCell(x, y) {
        let canvas = document.getElementById('canvas-area');
        let ctx = canvas.getContext('2d');
        let step = canvas.width / 10;
        let ctxSize = canvas.width / step;

        ctx.strokeRect( x*ctxSize, y*ctxSize, ctxSize, ctxSize );
    }
    delete() {
        let canvas = document.getElementById('canvas-area');
        let ctx = canvas.getContext('2d');
        let step = canvas.width / 10;
        let ctxSize = canvas.width / step;
        for (let i = 0; i < step; i++){
            for (let j = 0; j < step; j++) {
                ctx.clearRect( i*ctxSize, j*ctxSize, ctxSize, ctxSize);
            }
        }

    }
    matrixArray(rows, columns){
        let arr = [];
        for(let i=0; i<rows; i++){
            arr[i] = [];
            for(let j=0; j<columns; j++){
                arr[i][j] = 0;
            }
        }
        return arr;
    }
}
window.onload = function () {
    let live = new liveGame();
    live.init();
};
