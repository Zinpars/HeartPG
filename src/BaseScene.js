import Player from "./Player.js"
import Enemy from "./Enemy.js"
import Debugging from "./Debugging.js";
import WavePositions from "./WavePositions.js";
import Skills from "./Skills.js";

export default class BaseScene extends Phaser.Scene {
    constructor(key) {
        super({ key })
        this.scene = key;
    }

    baseCreate() {
        this.player = new Player(this, 0, 0);
        this.player.setupPlayer(this, 500, 500);

        this.debugging = new Debugging(this, this.player, this.enemy);
        this.debugging.create();

        this.waveCount = 1;
        this.enemyArray = [];

        this.skills = new Skills(this, this.player);


        // Press 1 to cast meteor
        this.input.keyboard.on("keydown-ONE", () => {
            this.skills.castMeteor();
        })





    }

    update() {
        // Player movement
        this.player.movement();

        // Update Debugging
        this.debugging.update();

        // Player attack
        if (this.input.activePointer.leftButtonDown() && this.player.attackIsReady) {
            this.playerAttack();
        }

        this.playerGotHit();
        this.handleEnemyDeaths();

        // Overlap meteor enemy
        if (this.skills.meteor) {
            this.enemyArray.forEach(enemy => {
                this.physics.add.overlap(this.skills.meteor, enemy.sprite, () => {
                    if (!enemy.invulnerable) {
                        enemy.health -= this.skills.meteor.damage;
                        this.updateHealthBar(enemy);
                        enemy.invulnerable = true;
                        enemy.sprite.setTint(0x0000ff);
                    }
                });
            })
        }
    }

    updateHealthBar(sprite) {
        sprite.healthBar.width = sprite.health / sprite.maxHealth * 50;
        // sprite.healthText.setText(sprite.name + ' Health: ' + sprite.health);
        this.player.healthText.setText('Player Health: ' + this.player.health);
    }

    createWave(waveCount) {
        // Get positions for enemies from WavePositions
        const wavePositions = new WavePositions(this.game.config.width)
        const positions = wavePositions.getPositions(waveCount);

        // Create enemies
        positions.forEach(pos => {
            this.enemy = new Enemy(this, pos.x, pos.y, this.player.playerContainer);
            this.enemyArray.push(this.enemy);
        });
    }

    handleEnemyDeaths() {
        // Enemy dies
        this.enemyArray.forEach(enemy => {
            if (enemy.health <= 0 && !enemy.isDestroyed) {
                enemy.isDestroyed = true;
                enemy.container.destroy();
                this.player.experience += 1;
                this.player.experienceText.setText('Player Experience: ' + this.player.experience);
            }
        })
    }


    playerGotHit() {
        this.enemyArray.forEach(enemy => {
            this.physics.add.overlap(this.player.sprite, enemy.sprite, () => {
                if (!this.player.invulnerable) {
                    this.player.health -= 1;
                    this.updateHealthBar(this.player);

                    // Make player invulnerable for 1 second
                    this.player.sprite.setTint(0x0000ff);
                    this.player.invulnerable = true;
                    this.time.addEvent({
                        delay: 1000,
                        callback: () => {
                            this.player.invulnerable = false;
                            this.player.sprite.clearTint();
                        }
                    });
                }
            });
        })


    }

    playerAttack() {
        // Left click to Attack
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
                    enemy.sprite.setTint(0x0000ff);
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
                    enemy.sprite.clearTint();
                });
            }
        });

    }
}






