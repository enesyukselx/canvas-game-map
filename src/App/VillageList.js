import { Village } from "./Village.js";

export class VillagesList {
    constructor(startCord, finishCord, count) {
        this.fetchColors();
        this.fetchVillages();
        this.createRandomVillages(startCord, finishCord, count);
        return this.villages;
    }
    randomCord(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    fetchVillages() {
        this.villages = [];
    }
    fetchColors() {
        this.colors = ["red", "gray", "rgb(0,130,248)", "darkblue", "red"];
    }
    createRandomVillages(startCord, finishCord, count) {
        for (let i = 0; i < count; i++) {
            let randomX = this.randomCord(startCord, finishCord);
            let randomY = this.randomCord(startCord, finishCord);
            const check = this.villages.filter(
                (v) => randomX === v.x && randomY === v.y
            ).length;
            const color =
                this.colors[this.randomCord(0, this.colors.length - 1)];
            if (check < 1) {
                this.villages.push(new Village(randomX, randomY, color));
            }
        }
    }
}
