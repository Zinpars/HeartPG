import Player from "./Player.js"
import Enemy from "./Enemy.js"
import Debugging from "./Debugging.js";
import WavePositions from "./WavePositions.js";
import Skills from "./Skills.js";
import SkillBar from "./SkillBar.js";

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

        this.skillBar = new SkillBar(this, this.player);
        this.skills = new Skills(this, this.player, this.skillBar);
        for (let i = 0; i < this.skills.skillArray.length; i++) {
            this.skillBar.createCooldownBar(this.skills.skillArray[i], i + 1)
        }

        // Press 1 to cast meteor
        this.input.keyboard.on("keydown-ONE", () => {
            this.skills.castMeteor();
            this.enemyGotHit(this.skills.meteor.damage, this.skills.meteor.sprite);
        })

        // Press 2 to cast fireball
        this.input.keyboard.on("keydown-TWO", () => {
            this.skills.castFireball();
            this.enemyGotHit(this.skills.fireball.damage, this.skills.fireball.sprite);
        })

        // Press 3 to cast fire aura
        this.input.keyboard.on("keydown-THREE", () => {
            this.skills.castFireAura();
            this.enemyGotHit(this.skills.fireAura.damage, this.skills.fireAura.sprite);
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
    }

    updateHealthBar(sprite) {
        sprite.healthBar.width = sprite.health / sprite.maxHealth * 50;
        // sprite.healthText.setText(sprite.name + ' Health: ' + sprite.health);
        this.player.healthText.setText('Player Health: ' + this.player.health);
    }

    createWave(waveCount, level) {
        // Get positions for enemies from WavePositions
        const wavePositions = new WavePositions(this.game.config.width)
        const positions = wavePositions.getPositions(waveCount, level);

        // Create enemies
        positions.forEach(pos => {
            this.enemy = new Enemy(this, pos.x, pos.y, this.player.playerContainer);
            this.enemyArray.push(this.enemy);
        });

        // Reapply overlap for each attack/skill
        this.playerGotHit();
        if (this.meleeHitBox) {
            this.enemyGotHit(this.player.attackDamage, this.meleeHitBox);
        }
         if (this.skills.meteor.sprite) {
            this.enemyGotHit(this.skills.meteor.damage, this.skills.meteor.sprite);
        }
       if (this.skills.fireball.sprite) {
            this.enemyGotHit(this.skills.fireball.damage, this.skills.fireball.sprite);
        }
        if (this.skills.fireAura.sprite) {
            this.enemyGotHit(this.skills.fireAura.damage, this.skills.fireAura.sprite);
        }
    }

    handleEnemyDeaths(enemy) {
            if (enemy.health <= 0 && !enemy.isDestroyed) {
                enemy.isDestroyed = true;
                enemy.container.destroy();

                // Grant experience TODO: experience variable
                this.player.experience += 1;
                this.player.experienceText.setText('Player Experience: ' + this.player.experience);
            }
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

        this.enemyGotHit(this.player.attackDamage, this.meleeHitBox);

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
            }
        });

    }

    enemyGotHit(damage, hitbox) {
        this.enemyArray.forEach(enemy => {
            const overlap = this.physics.add.overlap(hitbox, enemy.sprite, () => {
                if (!enemy.invulnerable) {
                    enemy.health -= damage;
                    this.updateHealthBar(enemy);
                    this.handleEnemyDeaths(enemy)
                    if (hitbox !== this.skills.fireAura.sprite) {
                        overlap.destroy();
                    }
                }
            });
        });

    }
}






