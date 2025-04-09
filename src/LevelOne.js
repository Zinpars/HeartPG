class LevelOne extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelOne' });
    }

    preload() {
        this.load.image('redHeart', './assets/redHeart.png');
    }

    create() {
        // Create player
        gameState.player = this.add.sprite(0, 0, 'redHeart');
        gameState.player.maxHealth = 3;
        gameState.player.health = gameState.player.maxHealth;
        gameState.player.speed = 5;
        gameState.player.experience = 0;
        gameState.player.attackIsReady = true;
        gameState.player.level = 1;
        gameState.player.attackDamage = 3;
        gameState.waveCount = 1;
        gameState.waveCountMax = 5;

        // Create player Container
        gameState.player.healthBar = this.add.rectangle(gameState.player.x, gameState.player.y - 50, gameState.player.health / gameState.player.maxHealth * 50, 10, 0x00FF00).setOrigin(0.5);
        gameState.player.hurtBox = this.add.rectangle(gameState.player.x, gameState.player.y, 50, 50, 0x005555).setOrigin(0.5);
        gameState.playerContainer = this.add.container(game.config.width * 0.5, 500, [
            gameState.player.hurtBox,
            gameState.player,
            gameState.player.healthBar,
        ]);
        gameState.playerContainer.setSize(50, 50);

        // Enable physics for player
        this.physics.world.enable(gameState.player);
        gameState.player.body.setAllowGravity(false);
        this.physics.world.enable(gameState.playerContainer);
        gameState.playerContainer.body.setCollideWorldBounds(true);

        // Create controls
        gameState.cursors = this.input.keyboard.createCursorKeys();
        gameState.w = this.input.keyboard.addKey('W');
        gameState.a = this.input.keyboard.addKey('A');
        gameState.s = this.input.keyboard.addKey('S');
        gameState.d = this.input.keyboard.addKey('D');

        // Create enemyArray
        gameState.enemyArray = [];
        this.createWave(gameState.waveCount);


        // Create debugging
        gameState.playerContainerXText = this.add.text(10, 50, 'Player Container X: ' + gameState.playerContainer.x);
        gameState.playerContainerYText = this.add.text(10, 70, 'Player Container Y: ' + gameState.playerContainer.y);
        gameState.enemy.healthText = this.add.text(10, 90, 'Enemy Health: ' + gameState.enemy.health);
        gameState.player.healthText = this.add.text(10, 110, 'Player Health: ' + gameState.player.health);
        gameState.player.experienceText = this.add.text(10, 130, 'Player Experience: ' + gameState.player.experience);
        gameState.player.levelText = this.add.text(10, 150, 'Player Level: ' + gameState.player.level);
        gameState.waveCountText = this.add.text(10, 170, 'Wave Count: ' + gameState.waveCount);
        // End of create
    }

    update() {

        // Movement
        if (gameState.cursors.left.isDown || gameState.a.isDown) {
            gameState.playerContainer.x -= gameState.player.speed;
        }
        if (gameState.cursors.right.isDown || gameState.d.isDown) {
            gameState.playerContainer.x += gameState.player.speed;
        }
        if (gameState.cursors.up.isDown || gameState.w.isDown) {
            gameState.playerContainer.y -= gameState.player.speed;
        }
        if (gameState.cursors.down.isDown || gameState.s.isDown) {
            gameState.playerContainer.y += gameState.player.speed;
        }
        // Enemy movement
        for (let i = 0; i < gameState.enemyArray.length; i++) {
            gameState.enemyArray[i].update();
        }
        // Player gets hit
        gameState.enemyArray.forEach(enemy => {
            this.physics.add.overlap(gameState.player, enemy.sprite, () => {
                if (!gameState.player.invulnerable) {
                    gameState.player.health -= 1;
                    gameState.player.healthText.setText('Player Health: ' + gameState.player.health);
                    this.updateHealthBar(gameState.player);
                    gameState.player.invulnerable = true;
                    this.time.addEvent({
                        delay: 1000,
                        callback: () => {
                            gameState.player.invulnerable = false;
                        }
                    });
                }
            });
        })
        // Left click to Attack
        if (this.input.activePointer.leftButtonDown() && gameState.player.attackIsReady) {
            gameState.player.attackIsReady = false;

            // Create hitbox
            gameState.meleeHitBox = this.add.rectangle(0, -20, 50, 90, 0x222255).setOrigin(0.5);
            gameState.playerContainer.add(gameState.meleeHitBox);
            this.physics.world.enable(gameState.meleeHitBox);
            gameState.meleeHitBox.body.setAllowGravity(false);

            // Melee hit
            gameState.enemyArray.forEach(enemy => {
                this.physics.add.overlap(gameState.meleeHitBox, enemy.sprite, () => {
                    if (!enemy.invulnerable) {
                        enemy.health -= gameState.player.attackDamage;
                        this.updateHealthBar(enemy);
                        enemy.invulnerable = true;
                    }
                });
            });
            // Destroy hitbox after delay
            this.time.addEvent({
                delay: 200,
                callback: () => {
                    gameState.meleeHitBox.destroy();
                }
            });
            // Cooldown
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    gameState.player.attackIsReady = true;
                    gameState.enemyArray.forEach(enemy => {
                        enemy.invulnerable = false;
                    });
                }
            });

        }
        // Enemy dies
        gameState.enemyArray.forEach(enemy => {
            if (enemy.health <= 0 && !enemy.isDestroyed) {
                enemy.isDestroyed = true;
                enemy.container.destroy();
                gameState.player.experience += 1;
                gameState.player.experienceText.setText('Player Experience: ' + gameState.player.experience);
            }
        })
        // Game over
        if (gameState.player.health <= 0) {
 
            
            gameState.gameOverText = this.add.text(200, 200, 'Game Over', { fontSize: '50px', fill: '#FFFFFF' });
            // TODO remove gameovertext after 2 seconds
            this.time.addEvent({
                delay: 2000,
                callback: () => {
                    
                    this.resetVariables();
                }
            });

        }
        // Level up
        if (gameState.player.experience >= 3) {
            gameState.player.experience = 0;
            gameState.player.experienceText.setText('Player Experience: ' + gameState.player.experience);
            gameState.player.level += 1;
            gameState.player.levelText.setText('Player Level: ' + gameState.player.level);
        }
        // Wave count
        if (gameState.enemyArray.every(enemy => enemy.isDestroyed)) {
            gameState.waveCount += 1;
            gameState.waveCountText.setText('Wave Count: ' + gameState.waveCount);
            gameState.enemyArray = [];
            this.createWave(gameState.waveCount);
        }

        // Victory
        if (gameState.waveCount > gameState.waveCountMax) {
            this.add.text(200, 200, 'Victory!', { fontSize: '50px', fill: '#FFFFFF' });
        }
        // Update debugging
        gameState.playerContainerXText.setText('Player Container X: ' + gameState.playerContainer.x);
        gameState.playerContainerYText.setText('Player Container Y: ' + gameState.playerContainer.y);
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
                { x: game.config.width * 0.5, y: 100 },

            ],
            // Wave 2 positions
            [
                { x: game.config.width * 0.3, y: 100 },
                { x: game.config.width * 0.5, y: 100 },
                { x: game.config.width * 0.7, y: 100 }
            ],
            // Wave 3 positions
            [
                { x: game.config.width * 0.3, y: 100 },
                { x: game.config.width * 0.4, y: 100 },
                { x: game.config.width * 0.5, y: 100 },
                { x: game.config.width * 0.6, y: 100 },
                { x: game.config.width * 0.7, y: 100 }
            ],
            // Wave 4 positions
            [
                { x: game.config.width * 0.3, y: 100 },
                { x: game.config.width * 0.4, y: 100 },
                { x: game.config.width * 0.5, y: 100 },
                { x: game.config.width * 0.6, y: 100 },
                { x: game.config.width * 0.7, y: 100 },
                { x: game.config.width * 0.3, y: 200 },
                { x: game.config.width * 0.8, y: 200 },
            ],
            // Wave 5 positions
            [
                { x: game.config.width * 0.3, y: 100 },
                { x: game.config.width * 0.4, y: 100 },
                { x: game.config.width * 0.5, y: 100 },
                { x: game.config.width * 0.6, y: 100 },
                { x: game.config.width * 0.7, y: 100 },
                { x: game.config.width * 0.3, y: 200 },
                { x: game.config.width * 0.3, y: 300 },
                { x: game.config.width * 0.8, y: 200 },
                { x: game.config.width * 0.8, y: 300 },
            ]
        ];

        const positions = wavePositions[waveCount - 1] || wavePositions[0];

        positions.forEach(pos => {
            gameState.enemy = new Enemy(this, pos.x, pos.y);
            gameState.enemyArray.push(gameState.enemy);
        });
    }

    resetVariables() {
        gameState.player.health = gameState.player.maxHealth;
        this.updateHealthBar(gameState.player);
        gameState.player.attackIsReady = true;
        gameState.waveCount = 1;
        gameState.enemyArray.forEach(enemy => {
            enemy.container.destroy();
        });
        gameState.enemyArray = [];
        this.createWave(gameState.waveCount);
        gameState.playerContainer.x = game.config.width * 0.5;
        gameState.playerContainer.y = 500;
    }
    // End of Helper functions
}


class Enemy {
    constructor(scene, x, y) {
        this.scene = scene;
        this.maxHealth = 3;
        this.health = this.maxHealth;
        this.speed = 2;
        this.isDestroyed = false;

        // Create enemy sprite and health bar
        this.sprite = scene.add.sprite(0, 0, 'redHeart');
        this.healthBar = scene.add.rectangle(0, -50, this.health / this.maxHealth * 50, 10, 0x00FF00).setOrigin(0.5);


        // Create enemy container
        this.container = scene.add.container(x, y, [
            this.sprite,
            this.healthBar
        ]);

        // Enable physics for enemy
        scene.physics.world.enable(this.sprite);
        this.sprite.body.setAllowGravity(false);
    }

    update() {
        // Dummy movement logic
        if (gameState.playerContainer.x < this.container.x) {
            this.container.x -= this.speed;
        }
        if (gameState.playerContainer.x > this.container.x) {
            this.container.x += this.speed;
        }
        if (gameState.playerContainer.y < this.container.y) {
            this.container.y -= this.speed;
        }
        if (gameState.playerContainer.y > this.container.y) {
            this.container.y += this.speed;
        }
    }
}
