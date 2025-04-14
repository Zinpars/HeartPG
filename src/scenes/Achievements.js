import Navigation from "../objects/Navigation.js";

export default class Achievements extends Phaser.Scene {
    constructor() {
        super("Achievements")
    }

    create(data) {
        this.player = data.player;
        for (let i = 1; i <= 5; i++) {
            this.createLevelButton(200 * (i), 300, i);
        }
        const navigation = new Navigation(this);
    }

    createLevelButton(x, y, level) {
        const button = this.add.rectangle(x, y, 100, 50, 0x222222).setOrigin(0.5).setInteractive();
        this.add.text(x, y, level)
    }
}