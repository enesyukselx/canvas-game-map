import { Canvas } from "./Canvas.js";
import { DOMHelper } from "./DOMHelper.js";

export class MainMap extends DOMHelper{
    constructor(rootEl, villages, settings) {
        super("main-map");
        this.settings = settings;
        this.villages = villages;
        this.rootEl = rootEl;
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
        this.inputX = document.getElementById('x-cord');
        this.inputY = document.getElementById('y-cord');
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

        const barbar = new Image(45,35);
        const normal = new Image(45,35);
        const normal2 = new Image(45,35);
        const normal3 = new Image(45,35);
        const normal4 = new Image(45,35);
        barbar.src = "https://dstr.innogamescdn.com/asset/1d2499b/graphic///map_new/b4_left.png";
        normal.src = "https://dstr.innogamescdn.com/asset/1d2499b/graphic///map_new/v5.png";
        normal2.src = "https://dstr.innogamescdn.com/asset/1d2499b/graphic///map_new/v6.png";
        normal3.src = "https://dstr.innogamescdn.com/asset/1d2499b/graphic///map_new/b6.png";
        normal4.src = "https://dstr.innogamescdn.com/asset/1d2499b/graphic///map_new/v6.png";

        for(const village of this.villages) {
            if(this.scale >= .5){
                if(village.color === "gray"){
                    this.ctx.drawImage(barbar, village.x * 50, village.y * 50, 45, 34)
                }else if(village.color === "red"){
                    this.ctx.drawImage(normal2, village.x * 50, village.y * 50, 45, 34)
                }else if(village.color === "darkblue"){
                    this.ctx.drawImage(normal3, village.x * 50, village.y * 50, 45, 34)
                }else if(village.color === "blue"){
                    this.ctx.drawImage(normal4, village.x * 50, village.y * 50, 45, 34)
                }else{
                    this.ctx.drawImage(normal, village.x * 50, village.y * 50, 45, 34)
                }

                this.ctx.fillStyle = village.color;
                this.ctx.fillRect(village.x*50,village.y*50,5,5);
                this.ctx.strokeStyle = "black";
                this.ctx.strokeRect(village.x*50,village.y*50,5,5);
            }else{
                this.ctx.fillStyle = village.color;
                this.ctx.fillRect(village.x*50,village.y*50,30,30);
            }
        }


        this.drawOthers();
        this.ctx.restore();

    }
    drawOthers(){
        // for(const village of this.villages){
        //     this.ctx.fillStyle = village.color;
        //     this.ctx.strokeStyle = "black";
        //     this.ctx.fillRect(village.x*50, village.y*50, 5,5);
        //     this.ctx.strokeRect(village.x*50, village.y*50, 5,5);
        // }


        for(let k=-50000; k<=50000; k+=1250){
            this.ctx.beginPath();
            this.ctx.moveTo(k,-50000);
            this.ctx.lineTo(k,50000);
            this.ctx.strokeStyle = "black";
            this.ctx.lineWidth = 1.55;
            this.ctx.stroke();
        }
        for(let k=-50000; k<=50000; k+=1250){
            this.ctx.beginPath();
            this.ctx.moveTo(-50000, k);
            this.ctx.lineTo(50000, k);
            this.ctx.strokeStyle = "black";
            this.ctx.lineWidth = 1.55;
            this.ctx.stroke();
        }

        this.ctx.restore();
        this.ctx.fillStyle = "black";
        this.ctx.fillRect((this.canvas.width/2)-3 , (this.canvas.height/2)-3,6,6);


    }
}
