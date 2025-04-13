import Player from "./Player.js"
import Enemy from "./Enemy.js"
import Debugging from "./Debugging.js";
import WavePositions from "./WavePositions.js";
import Skills from "./Skills.js";
import SkillBar from "./SkillBar.js";
import Tooltip from "./Tooltip.js";
import Layers from "./Layers.js";

export default class BaseScene extends Phaser.Scene {
    constructor() {
        super("BaseScene")
    }

    create(data) {
        this.level = data.level;
        this.waveCountMax = this.level.waveCountMax;
        this.player = new Player(this, 0, 0);
        if (data.player) {
            this.player.setupPlayer(this, data.player);
        }

        this.debugging = new Debugging(this, this.player, this.enemy);
        this.debugging.create();

        this.waveCount = 1;
        this.enemyArray = [];
        

        this.tooltip = new Tooltip(this, this.player);
        this.tooltip.createTooltipWindow(this);

        this.skillBar = new SkillBar(this, this.player);
        this.skills = new Skills(this, this.player, this.skillBar);
        for (let i = 0; i < this.skills.skillArray.length; i++) {
            this.skillBar.createCooldownBar(this.skills.skillArray[i], i + 1, this.tooltip);
        }
        this.skillBar.createExperienceBar(this, this.player);

        // Press 1 to cast meteor
        this.input.keyboard.on("keydown-ONE", () => {
            this.skills.castSkill("castMeteor", this.player);
            this.enemyGotHit(this.skills.meteor.damage, this.skills.meteor.sprite);
        })

        // Press 2 to cast fireball
        this.input.keyboard.on("keydown-TWO", () => {
            this.skills.castSkill("castFireball", this.player);
            this.enemyGotHit(this.skills.fireball.damage, this.skills.fireball.sprite);
        })

        // Press 3 to cast fire aura
        this.input.keyboard.on("keydown-THREE", () => {
            this.skills.castSkill("castFireAura", this.player);
            this.enemyGotHit(this.skills.fireAura.damage, this.skills.fireAura.sprite);
        })

        // Create first wave
        this.createWave(this.waveCount, this.level.id);
    }

    update() {
        // Enemy movement
        for (let i = 0; i < this.enemyArray.length; i++) {
            this.enemyArray[i].update(this.player.playerContainer);
        }

        // Player movement
        if (this.player.isInCutscene) return;
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
        const positions = WavePositions(this.game.config.width)[level][waveCount - 1];

        // Create enemies
        positions.forEach(pos => {
            this.enemy = new Enemy(this, pos.x, pos.y, pos.type, this.player.playerContainer);
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

            // Award experience
            this.player.experience += enemy.experience || 1;
            this.player.experienceText.setText('Player Experience: ' + this.player.experience);


            this.checkLevelUp();
            this.skillBar.updateExperienceBar(this.player);
            this.skillBar.experienceBar.text.setText(`Level: ${this.player.level}       Exp: ${this.player.experience} / ${this.player.experienceToLevelUp}`);
            this.increaseWaveCount();
            this.checkVictory();
        }
    }

    checkVictory() {
        // Victory
        if (this.enemyArray.every(enemy => enemy.isDestroyed) && this.waveCount >= this.waveCountMax) {
            this.add.text(this.game.config.width / 2, this.game.config.height / 2, 'Victory!', { fontSize: '50px', fill: '#FFFFFF' }).setOrigin(0.5);
            this.time.addEvent({
                delay: 2000,
                callback: () => {
                    this.scene.start("LevelSelect", { player: this.player });
                }               
            })
        }
    }

    // Wave count
    increaseWaveCount() {
        if (this.enemyArray.every(enemy => enemy.isDestroyed) && this.waveCount < this.waveCountMax) {
            this.waveCount += 1;
            this.waveCountText.setText('Wave Count: ' + this.waveCount);
            this.enemyArray = [];

            this.createWave(this.waveCount, this.level.id);
        }
    }


    checkLevelUp() {
        if (this.player.experience >= this.player.experienceToLevelUp) {
            // Reset experience
            this.player.experience = 0 + this.player.experience - this.player.experienceToLevelUp;
            this.player.experienceText.setText('Player Experience: ' + this.player.experience);

            // Increase level
            this.player.level += 1;
            this.player.levelText.setText('Player Level: ' + this.player.level);

            // Update experience to level Up
            this.player.experienceToLevelUp += 5 * this.player.level;

            // Level up animation
            const levelup = this.add.sprite(0, -30, 'levelup').setOrigin(0.5).setScale(0.3).setAlpha(0);
            this.player.playerContainer.add(levelup);
            this.player.playerContainer.sendToBack(levelup);
            this.tweens.add({
                targets: levelup,
                alpha: 1,
                duration: 500,
                yoyo: true,
                hold: 500,
                onComplete: () => {
                    levelup.destroy();
                }
            });
        }
    }

    playerGotHit() {
        this.enemyArray.forEach(enemy => {
            this.physics.add.overlap(this.player, enemy.sprite, () => {
                if (!this.player.invulnerable) {
                    this.player.health -= enemy.damage;
                    this.checkGameOver();
                    this.updateHealthBar(this.player);

                    // Make player invulnerable for 1 second
                    this.player.setTint(0x0000ff);
                    this.player.invulnerable = true;
                    this.time.addEvent({
                        delay: 1000,
                        callback: () => {
                            this.player.invulnerable = false;
                            this.player.clearTint();
                        }
                    });
                }
            });
        })
    }

    checkGameOver() {
        // Game over
        if (this.player.health <= 0) {
            this.player.health = this.player.maxHealth;
            this.player.isInCutscene = true;

            // Remove active sprites
            if (this.meleeHitBox) this.meleeHitBox.destroy();
            if (this.skills.meteor.sprite) this.skills.meteor.sprite.destroy();
            if (this.skills.fireball.sprite) this.skills.fireball.sprite.destroy();
            if (this.skills.fireAura.sprite) this.skills.fireAura.sprite.destroy();

            this.gameOverText = this.add.text(this.game.config.width / 2, this.game.config.height / 2, 'Game Over', { fontSize: '50px', fill: '#FFFFFF' }).setOrigin(0.5);
            const fadeOut = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x000000).setOrigin(0).setAlpha(0);
            this.tweens.add({
                targets: fadeOut,
                alpha: 1,
                duration: 2000,
                onComplete: () => {
                    this.scene.start("MainMenu", { player: this.player });
                }
            })
        }
    }

    playerAttack() {
        // Left click to Attack
        this.player.attackIsReady = false;

        // Create hitbox
        this.meleeHitBox = this.add.rectangle(0, -20, 50, this.player.attackRange, 0x222255).setOrigin(0.5, 1);
        this.player.playerContainer.add(this.meleeHitBox);
        this.physics.world.enable(this.meleeHitBox);
        this.meleeHitBox.body.setAllowGravity(false);

        this.enemyGotHit(this.player.attackDamage, this.meleeHitBox);

        // Destroy hitbox after delay
        this.time.addEvent({
            delay: this.player.attackDuration,
            callback: () => {
                this.meleeHitBox.destroy();
            }
        });
        // Cooldown
        this.time.addEvent({
            delay: this.player.attackCooldown,
            callback: () => {
                this.player.attackIsReady = true;
            }
        });

    }

    enemyGotHit(damage, hitbox) {
        if (!hitbox) return;
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






