/* import BaseScene from './BaseScene.js';
import Enemy from './Enemy.js';
import Player from './Player.js';

export default class LevelOne extends BaseScene {
    constructor() {
        super('LevelOne');
    }

    

    create(data) {
        this.baseCreate(data);
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
        if (this.physics.overlap(this.player, this.door)) {
            this.player.isInCutscene = true;
            if (this.playerContainer) {
                this.playerContainer.destroy();
            }
            this.scene.start('LevelTwo', { player: this.player });           
        }

        
        

        

        // End of update    
    }
    // Helper functions

    // End of Helper functions
}




 */