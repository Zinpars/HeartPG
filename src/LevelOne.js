import BaseScene from './BaseScene.js';
import Enemy from './Enemy.js';
import Player from './Player.js';
import WavePositions from './WavePositions.js';

export default class LevelOne extends BaseScene {
    constructor() {
        super('LevelOne');
    }

    preload() {
        this.load.image('redHeart', './assets/redHeart.png');
        this.load.image("meteor", "./assets/meteor.png");
    }

    create(data) {
        console.log(this.data);
        this.baseCreate();
        this.waveCountMax = 5;

        // Create door
        this.door = this.add.rectangle(this.game.config.width * 0.2, this.game.config.height * 0.8, 50, 50, 0x222222).setOrigin(0.5);
        this.physics.world.enable(this.door);
        this.door.body.setAllowGravity(false);
 

        // Create enemyArray
        this.enemyArray = [];
        this.createWave(this.waveCount);
     
        // End of create 
    }

    update() {
        super.update();
        

        // Enter Door
        if (this.physics.overlap(this.player.sprite, this.door)) {
            this.scene.start('LevelTwo');
        }

        
        // Enemy movement
        for (let i = 0; i < this.enemyArray.length; i++) {
            this.enemyArray[i].update();
        }
        
        // Player gets hit     
        

        // Game over
        if (this.player.health <= 0) {
            this.player.health = this.player.maxHealth;
            
            this.gameOverText = this.add.text(200, 200, 'Game Over', { fontSize: '50px', fill: '#FFFFFF' });
            // TODO prevent player movement and attacks
            this.time.addEvent({
                delay: 2000,
                callback: () => {
                    
                    this.scene.restart();
                }
            });

        }
        // Level up
        if (this.player.experience >= 3) {
            this.player.experience = 0;
            this.player.experienceText.setText('Player Experience: ' + this.player.experience);
            this.player.level += 1;
            this.player.levelText.setText('Player Level: ' + this.player.level);
        }
        // Wave count
        if (this.enemyArray.every(enemy => enemy.isDestroyed)) {
            this.waveCount += 1;
            this.waveCountText.setText('Wave Count: ' + this.waveCount);
            this.enemyArray = [];
            this.createWave(this.waveCount);
        }

        // Victory
        if (this.waveCount > this.waveCountMax) {
            this.add.text(200, 200, 'Victory!', { fontSize: '50px', fill: '#FFFFFF' });
        }
        
        // End of update    
    }
    // Helper functions
    

    

    /* resetVariables() {
        this.gameOverText.destroy();
        this.meleeHitBox.destroy();
        this.player.health = this.player.maxHealth;
        this.updateHealthBar(this.player);
        this.player.attackIsReady = true;
        this.waveCount = 1;
        this.enemyArray.forEach(enemy => {
            enemy.container.destroy();
        });
        this.enemyArray = [];
        this.createWave(this.waveCount);
        this.player.playerContainer.x = this.game.config.width * 0.5;
        this.player.playerContainer.y = 500;
    } */
    // End of Helper functions
}




