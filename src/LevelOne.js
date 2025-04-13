import BaseScene from './BaseScene.js';
import Enemy from './Enemy.js';
import Player from './Player.js';

export default class LevelOne extends BaseScene {
    constructor() {
        super('LevelOne');
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
        console.log(this.data);
        this.baseCreate();
        this.waveCountMax = 5;

        // Create door
        this.door = this.add.rectangle(this.game.config.width * 0.1, this.game.config.height * 0.8, 50, 50, 0x222222).setOrigin(0.5);
        this.physics.world.enable(this.door);
        this.door.body.setAllowGravity(false);


        // Create enemyArray
      //  this.enemyArray = [];
        

        // End of create 
    }

    update() {
        super.update();


        // Enter Door
        if (this.physics.overlap(this.player.sprite, this.door)) {
            this.scene.start('LevelTwo');
        }

        
        

        // Victory
        if (this.enemyArray.every(enemy => enemy.isDestroyed) && this.waveCount >= this.waveCountMax) {
            this.add.text(this.game.config.width / 2, this.game.config.height / 2, 'Victory!', { fontSize: '50px', fill: '#FFFFFF' }).setOrigin(0.5);
        }

        // End of update    
    }
    // Helper functions

    // End of Helper functions
}




