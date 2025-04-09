import BaseScene from './BaseScene.js';

export default class MainMenu extends BaseScene {
    constructor() {
        super('MainMenu');
    }

    

    preload() {

    }

    create() {
        // Create background
        this.add.rectangle(this.game.config.width * 0.5, this.game.config.height * 0.5, this.game.config.width, this.game.config.height, 0x446600);
        // Create title
        this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.2, '♥PG').setOrigin(0.5).setFontSize(62);
        // Create controls
        this.cursors = this.input.keyboard.createCursorKeys();
        // Create start button
        let startButton = this.add.rectangle(this.game.config.width * 0.5, this.game.config.height * 0.5, 200, 50, 0x222222).setInteractive();
        this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.5, 'Start').setOrigin(0.5);
        startButton.on('pointerdown', () => {
            this.scene.start('LevelOne');
        });

        // Start game when space is pressed
        this.cursors.space.on("down", () => {
            this.scene.start('LevelOne');        
        })

    }

    update() {

    }

}
