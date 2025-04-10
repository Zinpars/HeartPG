import Player from "./Player.js"

export default class BaseScene extends Phaser.Scene {
    constructor(key) {
        super({ key })
        this.scene = key;
    }

    create() {
        console.log("BaseScene create");
    }

    baseCreate() {
        console.log("BaseScene baseCreate");
        this.player = new Player(this, 0, 0);
        this.player.setupPlayer(this, 500, 500);

    }

    update() {

    }
}

