import BaseScene from './BaseScene.js';
import Enemy from './Enemy.js';
import Player from './Player.js';

export default class LevelTwo extends BaseScene {
    constructor() {
        super('LevelTwo');
    }

    create(data) {
        console.log(this.data);
        this.baseCreate();
        this.waveCountMax = 5;

        // Create door
        this.door = this.add.rectangle(this.game.config.width * 0.1, this.game.config.height * 0.5, 50, 50, 0x222222).setOrigin(0.5);
        this.physics.world.enable(this.door);
        this.door.body.setAllowGravity(false);


        // Create enemyArray
        this.enemyArray = [];
        this.createWave(this.waveCount, "LevelTwo");

        // End of create 
    }

    update() {
        super.update();


        // Enter Door
        if (this.physics.overlap(this.player.sprite, this.door)) {
            this.scene.start('LevelOne');
        }

        
        

        // Victory
        if (this.enemyArray.every(enemy => enemy.isDestroyed) && this.waveCount >= this.waveCountMax) {
            this.add.text(this.game.config.width / 2, this.game.config.height / 2, 'Victory!', { fontSize: '50px', fill: '#FFFFFF' }).setOrigin(0.5);
        }

        // End of update    
    }
}