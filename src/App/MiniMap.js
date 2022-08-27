import { Canvas } from "./Canvas.js";
import { DOMHelper } from "./DOMHelper.js";

export class MiniMap extends DOMHelper{
    constructor(rootEl, villages, settings) {
        super("mini-map");
        this.villages = villages;
        this.rootEl = rootEl;
        this.settings = settings;
        this.fetchCanvasElements();
        this.fetchDefaultValues();
        this.drawMap();
        this.eventListeners();
        this.visualListeners();
        this.canvasResize();
    }
    fetchCanvasElements(){
        this.canvas = new Canvas(this.rootEl);
        this.ctx = this.canvas.getContext('2d');
    }
    fetchDefaultValues(){
        this.translatePos = {
            x: this.canvas.width/2,
            y: this.canvas.height/2
        };
        this.scale = this.settings.scale;
        this.minScale = this.settings.minScale;
        this.maxScale = this.settings.maxScale;
        this.scaleMultiplier = this.settings.scaleMultiplier;
        this.startDragOffset = {};
        this.mouseDown = false;
        this.canvasDivMouse = false;
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
        if(this.scale > 1){
            this.ctx.fillStyle = "black";
            this.ctx.fillRect((this.canvas.width/2)-3 , (this.canvas.height/2)-3,6,6);
        }

        this.ctx.restore();
    }
}