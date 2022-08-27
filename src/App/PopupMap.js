import { Canvas } from "./Canvas.js";

export class PopupMap{
    constructor(rootEl, villages, settings) {
        this.rootEl = rootEl;
        this.villages = villages;
        this.settings = settings;
        this.fetchCanvasElements();
        this.fetchDefaultValues();
        this.drawMap();
        this.popupUIHandlers();
    }
    popupUIHandlers(){
        document.getElementById('open-popup-map').addEventListener('click', () => {
            document.getElementById('go-cords').click();
            document.getElementById(this.rootEl).parentElement.style.display = "block";
        });
        document.getElementById(this.rootEl).parentElement.addEventListener('click', () => {
            document.getElementById(this.rootEl).parentElement.style.display = "none";
        });
    }
    fetchCanvasElements(){
        this.canvas = new Canvas(this.rootEl, true);
        this.ctx = this.canvas.getContext('2d');
    }
    fetchDefaultValues(){
        this.translatePos = {
            x: this.canvas.width/2,
            y: this.canvas.height/2
        };
        this.scale = this.settings.scale;
    }
    drawMap(){
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.scale(this.scale, this.scale);
        this.ctx.setTransform(this.scale, 0, 0, this.scale, -(this.scale-1) * this.canvas.width/2, -(this.scale-1) * this.canvas.height/2);
        this.ctx.translate(this.translatePos.x, this.translatePos.y);
        for(const village of this.villages){
            this.ctx.fillStyle = village.color;
            this.ctx.fillRect(village.x,village.y,.8,.8);
        }
        this.drawOthers();
    }
    drawOthers(){
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = .015;
        for(let i=-1000; i<1000; i+=25) {
            for(let j=-1000; j<1000; j+=25){
                this.ctx.strokeRect(i,j,25,25);
                this.ctx.strokeRect(j,i,25,25);
            }
        }
        this.ctx.restore();
    }
}