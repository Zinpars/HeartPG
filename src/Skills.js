

export default class Skills {
    constructor(scene, player, skillBar) {
        this.scene = scene;
        this.player = player;
        this.skillBar = skillBar;

        this.meteor = {};
        this.meteor.isReady = true;
        this.meteor.name = "meteor";
        this.meteor.cooldown = 5000;
        this.meteor.damage = 6;
        this.meteor.description = `Summon a meteor at the mouse position that deals ${this.meteor.damage} damage to enemies in a small area.`


        this.fireball = {};
        this.fireball.isReady = true;
        this.fireball.name = "fireball";
        this.fireball.cooldown = 3000;
        this.fireball.damage = 3;
        this.fireball.description = `Launch a fireball at the mouse position that deals ${this.fireball.damage} damage to enemies.`

        this.fireAura = {};
        this.fireAura.isReady = true;
        this.fireAura.name = "fireAura";
        this.fireAura.cooldown = 10000;
        this.fireAura.damage = 0.5;
        this.fireAura.duration = 5000;
        this.fireAura.description = `Create a fire aura around the player that deals ${this.fireAura.damage} damage per second to enemies in the area.`

        this.skillArray = [this.meteor, this.fireball, this.fireAura];
    }

    castSkill(skillName, player) {
        if (player.isInCutscene) return;
        this[skillName]();
    }

    castMeteor() {
        // Create meteor at mouse position
        if (this.meteor.isReady) {
            this.meteor.isReady = false;

            this.meteor.sprite = this.scene.add.sprite(this.scene.input.activePointer.x, this.scene.input.activePointer.y, 'meteor')
                .setOrigin(0.5)
                .setScale(0.2);
            this.scene.physics.world.enable(this.meteor.sprite);
            this.meteor.sprite.body.setAllowGravity(false);
            this.meteor.sprite.body.setSize(this.meteor.sprite.width / 2, this.meteor.sprite.height / 2);

            this.skillBar.startCooldown(this.meteor);

            // Destroy meteor after delay
            this.scene.time.addEvent({
                delay: 300,
                callback: () => {
                    this.meteor.sprite.destroy();
                }
            });
        }
    }

    castFireball() {
        if (this.fireball.isReady) {
            this.fireball.isReady = false;

            // Create fireball at player position
            this.fireball.sprite = this.scene.add.sprite(this.player.playerContainer.x, this.player.playerContainer.y, 'fireball').setScale(0.05);
            this.scene.physics.world.enable(this.fireball.sprite);
            this.fireball.sprite.body.setAllowGravity(false);
            this.fireball.sprite.body.setSize(this.fireball.sprite.width / 2, this.fireball.sprite.height / 2);

            //Start cooldown bar
            this.skillBar.startCooldown(this.fireball);

            // Calculate direction vector to the pointer
            const pointer = this.scene.input.activePointer;
            const directionX = pointer.x - this.fireball.sprite.x;
            const directionY = pointer.y - this.fireball.sprite.y;
            const magnitude = Math.sqrt(directionX * directionX + directionY * directionY);

            // Normalize the direction vector and set velocity
            const speed = 600; // Adjust speed as needed
            this.fireball.sprite.body.setVelocity((directionX / magnitude) * speed, (directionY / magnitude) * speed);

            // Rotate the fireball towards the pointer
            const angle = Math.atan2(directionY, directionX);
            this.fireball.sprite.setRotation(angle);

            // Destroy the fireball after a certain time to prevent it from existing indefinitely
            this.scene.time.addEvent({
                delay: 5000, // Adjust the lifetime of the fireball
                callback: () => {
                    this.fireball.sprite.destroy();
                }
            });
        }
    }

    castFireAura() {
        if (this.fireAura.isReady) {
            this.fireAura.isReady = false;

            // Create fire aura at player position
            this.fireAura.sprite = this.scene.add.sprite(0, 0, "fireAura").setScale(0.5).setAlpha(0.5);
            this.scene.physics.world.enable(this.fireAura.sprite);
            this.fireAura.sprite.body.setAllowGravity(false);
            this.fireAura.sprite.body.setSize(this.fireAura.sprite.width / 2, this.fireAura.sprite.height / 2);

            // Start cooldown bar
            this.skillBar.startCooldown(this.fireAura);

            // Make the aura follow the player
            this.player.playerContainer.add(this.fireAura.sprite);

            // Destroy aura after delay
            this.scene.time.addEvent({
                delay: this.fireAura.duration,
                callback: () => {
                    this.fireAura.sprite.destroy();
                }
            });
        }
    }
}