import BaseScene from './BaseScene.js';
import Levels from "../config/Levels.js";
import Navigation from "../objects/Navigation.js";

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        this.load.image('redHeart', './assets/redHeart.png');
        this.load.image("whiteHeart", "./assets/whiteHeart.png");
        this.load.image("meteor", "./assets/meteor.png");
        this.load.image("fireball", "./assets/fireball.png");
        this.load.image("fireAura", "./assets/fireAura.png");
        this.load.image("player", "./assets/player.png");
        this.load.image("levelup", "./assets/levelup.png");
    }

    create(data) {
        this.player = data.player;
        // Create background
        this.add.rectangle(this.game.config.width * 0.5, this.game.config.height * 0.5, this.game.config.width, this.game.config.height, 0x446600);
        
        // Create title
        this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.2, '♥PG').setOrigin(0.5).setFontSize(62);
        
        // Create controls
        this.cursors = this.input.keyboard.createCursorKeys();
        
       /*  // Create start button
        let startButton = this.add.rectangle(this.game.config.width * 0.5, this.game.config.height * 0.5, 200, 50, 0x222222).setInteractive();
        this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.5, 'Start').setOrigin(0.5);
        startButton.on('pointerdown', () => {
            this.scene.start('BaseScene', { player: this.player, level: Levels[1] });
        });

        // Start game when space is pressed
        this.cursors.space.on("down", () => {
            this.scene.start('BaseScene', { player: this.player, level: Levels[1] });       
        })

        // Create level select button
        let levelButton = this.add.rectangle(this.game.config.width * 0.5, this.game.config.height * 0.8, 200, 50, 0x222222).setInteractive();
        this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.8, 'Level Selection').setOrigin(0.5);
        levelButton.on('pointerdown', () => {
            this.scene.start('LevelSelect', { player: this.player });
        }); */

        const navigation = new Navigation(this);

    }


}
