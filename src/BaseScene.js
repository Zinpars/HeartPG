import Player from "./Player.js"

export default class BaseScene extends Phaser.Scene {
    constructor(key) {
        super({ key })
        this.scene = key;
        console.log("BaseScene constructor", key);
    }

    create() {
        console.log("BaseScene create");
    }

    baseCreate() {
        console.log("BaseScene baseCreate");
        if (!this.player) {
            this.player = new Player(this, 0, 0);
            console.log("New Player created in BaseScene");
        }

    }

    update() {

    }
}

