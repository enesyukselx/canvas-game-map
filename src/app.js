import { VillagesList } from "./App/VillageList.js";
import { MiniMap } from "./App/MiniMap.js";
import { MainMap } from "./App/MainMap.js";
import { PopupMap } from "./App/PopupMap.js";

class App {
    static init() {
        const villageList = new VillagesList(-41, 41, 6199);
        new MiniMap("mini-map", villageList, {
            scale: 6,
            minScale: 4,
            maxScale: 20,
            scaleMultiplier: 0.8,
        });
        new MainMap("main-map", villageList, {
            scale: 1,
            minScale: 0.15,
            maxScale: 1.5,
            scaleMultiplier: 0.8,
        });
        new PopupMap("popup-map-content", villageList, {
            scale: 5.5,
        });
    }
}

App.init();
