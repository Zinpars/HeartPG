import BaseScene from './BaseScene.js';
import Enemy from './Enemy.js';
import Player from './Player.js';

export default class LevelOne extends BaseScene {
    constructor() {
        super('LevelOne');
    }

    preload() {
        this.load.image('redHeart', './assets/redHeart.png');
    }

    create(data) {
        console.log(this.data);
        console.log("LevelOne create");
        this.baseCreate();

        // Create door
        this.door = this.add.rectangle(this.game.config.width * 0.2, this.game.config.height * 0.8, 50, 50, 0x222222).setOrigin(0.5);
        this.physics.world.enable(this.door);
        this.door.body.setAllowGravity(false);
 

        // Create enemyArray
        this.enemyArray = [];
        this.createWave(this.waveCount);


       /*  // Create debugging
        this.playerContainerXText = this.add.text(10, 50, 'Player Container X: ' + this.playerContainer.x);
        this.playerContainerYText = this.add.text(10, 70, 'Player Container Y: ' + this.playerContainer.y);
        this.enemy.healthText = this.add.text(10, 90, 'Enemy Health: ' + this.enemy.health);
        this.player.healthText = this.add.text(10, 110, 'Player Health: ' + this.player.health);
        this.player.experienceText = this.add.text(10, 130, 'Player Experience: ' + this.player.experience);
        this.player.levelText = this.add.text(10, 150, 'Player Level: ' + this.player.level);
        this.waveCountText = this.add.text(10, 170, 'Wave Count: ' + this.waveCount);
        // End of create */
    }

    update() {
        // Player movement
        this.player.movement();

        // Enter Door
        if (this.physics.overlap(this.player.sprite, this.door)) {
            this.scene.start('LevelTwo');
        }

        
        // Enemy movement
        for (let i = 0; i < this.enemyArray.length; i++) {
            this.enemyArray[i].update();
        }
        // Player gets hit
        this.enemyArray.forEach(enemy => {
            this.physics.add.overlap(this.player.sprite, enemy.sprite, () => {
                if (!this.player.invulnerable) {
                    this.player.health -= 1;
                    this.player.healthText.setText('Player Health: ' + this.player.health);
                    this.updateHealthBar(this.player);
                    this.player.invulnerable = true;
                    this.time.addEvent({
                        delay: 1000,
                        callback: () => {
                            this.player.invulnerable = false;
                        }
                    });
                }
            });
        })
        // Left click to Attack
        if (this.input.activePointer.leftButtonDown() && this.player.attackIsReady) {
            this.player.attackIsReady = false;

            // Create hitbox
            this.meleeHitBox = this.add.rectangle(0, -20, 50, 90, 0x222255).setOrigin(0.5);
            this.player.playerContainer.add(this.meleeHitBox);
            this.physics.world.enable(this.meleeHitBox);
            this.meleeHitBox.body.setAllowGravity(false);

            // Melee hit
            this.enemyArray.forEach(enemy => {
                this.physics.add.overlap(this.meleeHitBox, enemy.sprite, () => {
                    if (!enemy.invulnerable) {
                        enemy.health -= this.player.attackDamage;
                        this.updateHealthBar(enemy);
                        enemy.invulnerable = true;
                    }
                });
            });
            // Destroy hitbox after delay
            this.time.addEvent({
                delay: 200,
                callback: () => {
                    this.meleeHitBox.destroy();
                }
            });
            // Cooldown
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.player.attackIsReady = true;
                    this.enemyArray.forEach(enemy => {
                        enemy.invulnerable = false;
                    });
                }
            });

        }
        // Enemy dies
        this.enemyArray.forEach(enemy => {
            if (enemy.health <= 0 && !enemy.isDestroyed) {
                enemy.isDestroyed = true;
                enemy.container.destroy();
                this.player.experience += 1;
                this.player.experienceText.setText('Player Experience: ' + this.player.experience);
            }
        })
        // Game over
        if (this.player.health <= 0) {
 
            
            this.gameOverText = this.add.text(200, 200, 'Game Over', { fontSize: '50px', fill: '#FFFFFF' });
            // TODO remove gameovertext after 2 seconds
            this.time.addEvent({
                delay: 2000,
                callback: () => {
                    
                    this.resetVariables();
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
        /* // Update debugging
        this.playerContainerXText.setText('Player Container X: ' + this.playerContainer.x);
        this.playerContainerYText.setText('Player Container Y: ' + this.playerContainer.y); */
        // End of update    
    }
    // Helper functions
    updateHealthBar(sprite) {
        sprite.healthBar.width = sprite.health / sprite.maxHealth * 50;
    }

    createWave(waveCount) {
        const wavePositions = [
            // Wave 1 positions
            [
                { x: this.game.config.width * 0.5, y: 100 },

            ],
            // Wave 2 positions
            [
                { x: this.game.config.width * 0.3, y: 100 },
                { x: this.game.config.width * 0.5, y: 100 },
                { x: this.game.config.width * 0.7, y: 100 }
            ],
            // Wave 3 positions
            [
                { x: this.game.config.width * 0.3, y: 100 },
                { x: this.game.config.width * 0.4, y: 100 },
                { x: this.game.config.width * 0.5, y: 100 },
                { x: this.game.config.width * 0.6, y: 100 },
                { x: this.game.config.width * 0.7, y: 100 }
            ],
            // Wave 4 positions
            [
                { x: this.game.config.width * 0.3, y: 100 },
                { x: this.game.config.width * 0.4, y: 100 },
                { x: this.game.config.width * 0.5, y: 100 },
                { x: this.game.config.width * 0.6, y: 100 },
                { x: this.game.config.width * 0.7, y: 100 },
                { x: this.game.config.width * 0.3, y: 200 },
                { x: this.game.config.width * 0.8, y: 200 },
            ],
            // Wave 5 positions
            [
                { x: this.game.config.width * 0.3, y: 100 },
                { x: this.game.config.width * 0.4, y: 100 },
                { x: this.game.config.width * 0.5, y: 100 },
                { x: this.game.config.width * 0.6, y: 100 },
                { x: this.game.config.width * 0.7, y: 100 },
                { x: this.game.config.width * 0.3, y: 200 },
                { x: this.game.config.width * 0.3, y: 300 },
                { x: this.game.config.width * 0.8, y: 200 },
                { x: this.game.config.width * 0.8, y: 300 },
            ]
        ];

        const positions = wavePositions[waveCount - 1] || wavePositions[0];

        positions.forEach(pos => {
            this.enemy = new Enemy(this, pos.x, pos.y, this.player.playerContainer);
            this.enemyArray.push(this.enemy);
        });
    }

    resetVariables() {
        this.player.health = this.player.maxHealth;
        this.updateHealthBar(this.player);
        this.player.attackIsReady = true;
        this.waveCount = 1;
        this.enemyArray.forEach(enemy => {
            enemy.container.destroy();
        });
        this.enemyArray = [];
        this.createWave(this.waveCount);
        this.playerContainer.x = this.game.config.width * 0.5;
        this.playerContainer.y = 500;
    }
    // End of Helper functions
}




