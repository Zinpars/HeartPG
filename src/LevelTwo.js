/* import BaseScene from './BaseScene.js';
import Enemy from './Enemy.js';
import Player from './Player.js';

export default class LevelTwo extends BaseScene {
    constructor() {
        super('LevelTwo');
    }

    create(data) {
        this.baseCreate(data);
        this.waveCountMax = 5;

        // Create door
        this.door = this.add.rectangle(this.game.config.width * 0.1, this.game.config.height * 0.5, 50, 50, 0x222222).setOrigin(0.5);
        this.physics.world.enable(this.door);
        this.door.body.setAllowGravity(false);



        // End of create 
    }

    update() {
        super.update();


        // Enter Door
        if (this.physics.overlap(this.player, this.door)) {
            this.scene.start('LevelOne', { player: this.player });
        }

        // End of update    
    }
} */