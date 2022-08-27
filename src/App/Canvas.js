export class Canvas{

    constructor(rootEl, popup = false) {
        this.rootEl = document.getElementById(rootEl);
        this.popup = popup;
        this.createCanvas();
        return this.canvas;
    }
    createCanvas(){
        this.canvas = document.createElement('canvas');
        if(this.popup){
            this.rootEl.parentElement.style.cursor = "pointer";
            this.canvas.setAttribute('width', 600);
            this.canvas.setAttribute('height', 600);
        }else{
            this.canvas.style.cursor = "move";
            this.canvas.setAttribute('width', this.rootEl.getBoundingClientRect().width);
            this.canvas.setAttribute('height', this.rootEl.getBoundingClientRect().height);
        }
        this.canvas.style.background = "url(https://dstr.innogamescdn.com/asset/1d2499b/graphic///map_new/gras1.png)";
        this.rootEl.style.background = "url(https://dstr.innogamescdn.com/asset/1d2499b/graphic///map_new/gras1.png)";
        this.rootEl.append(this.canvas);
    }

}