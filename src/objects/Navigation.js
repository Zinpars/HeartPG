import Layers from "../config/Layers.js";

export default class Navigation extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x || 50, y || 50);

        this.scene = scene;
        this.sceneKey = scene.sys.settings.key
        this.buttons = {};
        this.buttonIds = ["MainMenu", "LevelSelect", "Upgrades", "Classes", "Achievements", "Settings"]
        this.buttonNames = ["Main Menu", "Level Select", "Upgrades", "Classes", "Achievements", "Settings"]
        this.buttonAmount = 6;
        this.buttonWidth = 100;
        this.buttonHeight = 50;

        for (let i = 0; i < this.buttonAmount; i++) {
            this.createButtons(i, this.buttonIds[i]);
        }

        this.setDepth(Layers.UI);
        this.scene.add.existing(this);
        
    }

    createButtons(index, id) {
        this.buttons[id] = this.scene.add.rectangle(this.x  + (index * this.buttonWidth * 2), 0, this.buttonWidth, this.buttonHeight, 0x222222).setOrigin(0.5).setInteractive();
        this.buttons[id].text = this.scene.add.text(this.buttons[id].x, this.buttons[id].y, this.buttonNames[index]).setOrigin(0.5).setFontSize(16);
        if (this.sceneKey === id) {
            this.buttons[id].setFillStyle(0x72a17e);
        }
        this.add(this.buttons[id]);
        this.add(this.buttons[id].text);
        this.buttons[id].on("pointerup", () => {
            if (this.sceneKey === id) return;
            this.scene.scene.start(id, { player: this.scene.player });
            this.scene.scene.stop(this.scene.key);
        })
    }
}