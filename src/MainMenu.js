class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    

    preload() {

    }

    create() {
        // Create background
        this.add.rectangle(game.config.width * 0.5, game.config.height * 0.5, game.config.width, game.config.height, 0x446600);
        // Create title
        this.add.text(game.config.width * 0.5, game.config.height * 0.2, '♥PG').setOrigin(0.5).setFontSize(62);
        // Create controls
        gameState.cursors = this.input.keyboard.createCursorKeys();
        // Create start button
        let startButton = this.add.rectangle(game.config.width * 0.5, game.config.height * 0.5, 200, 50, 0x222222).setInteractive();
        this.add.text(game.config.width * 0.5, game.config.height * 0.5, 'Start').setOrigin(0.5);
        startButton.on('pointerdown', () => {
            this.scene.start('LevelOne');
        });
        

    }

    update() {
        if (gameState.cursors.space.isDown) {
            this.scene.start('LevelOne');
        }
    }

}