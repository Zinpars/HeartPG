import BaseScene from './BaseScene.js';
import Enemy from './Enemy.js';
import Player from './Player.js';

export default class LevelTwo extends BaseScene {
    constructor() {
        super('LevelTwo');
    }

    create() {
        console.log("LevelTwo create");
        this.baseCreate();

        // Create door
        this.door = this.add.rectangle(this.game.config.width * 0.2, this.game.config.height * 0.8, 50, 50, 0x222222).setOrigin(0.5);
        this.physics.world.enable(this.door);
        this.door.body.setAllowGravity(false);

        // Create enemyArray
        this.enemyArray = [];
        
    }

    update() {
        super.update();

        // Enter Door
        if (this.physics.overlap(this.player.sprite, this.door)) {
            this.scene.start('LevelOne');
        }
    }
}