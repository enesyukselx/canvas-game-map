export class DOMHelper{
    constructor(type) {
        this.type = type;
        this.fetchElements();
    }
    fetchElements(){
        if(this.type === "mini-map"){
            this.canvas = document.querySelector('#mini-map canvas');
        }else{
            this.canvas = document.querySelector('#main-map canvas');
        }
        this.inputX = document.getElementById('x-cord');
        this.inputY = document.getElementById('y-cord');
        this.cordBtn = document.getElementById('go-cords');
    }
    canvasResize(){
        window.addEventListener('resize',() => {
            this.canvas.setAttribute('width', document.getElementById(this.rootEl).getBoundingClientRect().width);
            this.canvas.setAttribute('height', document.getElementById(this.rootEl).getBoundingClientRect().height);
            document.getElementById('go-cords').click();
            this.drawMap();
        });
    }
    eventListeners(){
        this.canvas.addEventListener("mousedown", this.mouseDownHandler.bind(this));
        this.canvas.addEventListener("mouseup", this.mouseDownFalseHandler.bind(this));
        this.canvas.addEventListener("mouseover", this.mouseDownFalseHandler.bind(this));
        this.canvas.addEventListener("mouseout", this.mouseDownFalseHandler.bind(this));
        this.canvas.addEventListener("mousemove", this.mouseMoveHandler.bind(this));
        this.canvas.addEventListener('wheel',this.scaleHandler.bind(this));
    }
    scaleHandler(e){
        if(e.deltaY < 0){
            if(this.scale < this.maxScale){
                this.scale /= this.scaleMultiplier;
            }
        }
        if(e.deltaY > this.minScale){
            if(this.scale > this.minScale){
                this.scale *= this.scaleMultiplier;
            }
        }
        this.drawMap();
    }
    mouseDownHandler(e){
        this.mouseDown = true;
        this.startDragOffset.x = e.clientX - this.translatePos.x;
        this.startDragOffset.y = e.clientY - this.translatePos.y;
    }
    mouseDownFalseHandler(){
        this.mouseDown = false;
    }
    mouseMoveHandler(e){
        if(this.mouseDown){
            this.translatePos.x = e.clientX - this.startDragOffset.x;
            this.translatePos.y = e.clientY - this.startDragOffset.y;
            this.drawMap();
        }
    }
    visualListeners(){
        this.canvas.addEventListener('mousedown',(e) => {
            this.canvasDivMouse = true;
        })
        this.canvas.addEventListener('mousemove', (e) => {
            if(this.canvasDivMouse){
                // this.canvas.style.height = this.canvasDiv.getBoundingClientRect().height -5 + "px";
                // this.canvas.style.width = this.canvasDiv.getBoundingClientRect().width -5+ "px";
                // this.canvas.setAttribute('height', this.canvasDiv.getBoundingClientRect().height -15)
                // this.canvas.setAttribute('width', this.canvasDiv.getBoundingClientRect().width -15)
                if(this.type === "mini-map"){
                    this.inputX.value = -this.translatePos.x + this.canvas.width/2;
                    this.inputY.value = -(this.translatePos.y - this.canvas.height/2);
                }else{
                    this.inputX.value = (-this.translatePos.x + this.canvas.width/2) / 50;
                    this.inputY.value = -(this.translatePos.y - this.canvas.height/2) / 50;
                }
                this.drawMap();
            }
        },true)
        this.canvas.addEventListener('mouseup',e => {
            this.canvasDivMouse = false;
            this.cordBtn.click();
            this.drawMap();
        });
        this.cordBtn.addEventListener('click', () => {
            if(this.type === "mini-map"){
                this.translatePos.x= -parseInt(this.inputX.value) + this.canvas.width/2;
                this.translatePos.y= -parseInt(this.inputY.value) + this.canvas.height/2;
            }else{
                this.translatePos.x= (-parseInt(this.inputX.value * 50) + this.canvas.width/2) ;
                this.translatePos.y= (-parseInt(this.inputY.value * 50) + this.canvas.height/2) ;
            }
            this.drawMap();
        })

    }
}