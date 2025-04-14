import Levels from "../config/Levels.js";

export default class LevelSelect extends Phaser.Scene {
    constructor() {
        super("LevelSelect")
    }

    create(data) {
        this.player = data.player;
        for (let i = 1; i <= Object.keys(Levels).length; i++) {
            this.createLevelButton(200 * (i), 300, Levels[i]);
        }


    }

    createLevelButton(x, y, level) {
        const button = this.add.rectangle(x, y, 100, 50, 0x222222).setOrigin(0.5).setInteractive();
        this.add.text(x, y, level.name).setOrigin(0.5);

        button.on("pointerup", () => {
            this.scene.start("BaseScene", { player: this.player, level: level });
        })

    }
}