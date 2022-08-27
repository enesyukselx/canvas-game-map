export class Village{
    constructor(x,y,color) {
        this.fetchVillages(x,y,color);
    }

    fetchVillages(x,y,color){
        this.x = x;
        this.y = y;
        this.color = color;
    }
}