
export default class SkillBar {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
        this.width = this.scene.game.config.width;
        this.height = this.scene.game.config.height;
        this.skillAmount = 5;

        this.scene.add.rectangle(this.width / 2, this.height - 50, this.width, 100, 0x000000, 0.5).setOrigin(0.5);
        
    }

    createSkillBar(skills) {
        this.createMeteorBar(skills.meteor);
        this.createFireballBar(skills.fireball);
        this.createFireAuraBar(skills.fireAura);
    }

    createMeteorBar(meteor) {
        meteor.background = this.scene.add.rectangle(this.width / this.skillAmount, this.height - 50, this.width / this.skillAmount / 2, 100, 0xaaaaaa, 1).setOrigin(0.5);
        meteor.icon = this.scene.add.image(meteor.background.x, meteor.background.y, 'meteor').setOrigin(0.5).setScale(0.05);
        meteor.bar = this.scene.add.rectangle(meteor.background.x - meteor.background.width / 2, this.height, 0, 30, 0xff0000, 1).setOrigin(0, 0.5);        
    }

    meteorCooldown(meteor) {
        meteor.bar.width = meteor.background.width;
        const tween = this.scene.tweens.add({
            targets: meteor.bar,
            width: 0,
            duration: meteor.cooldown,
            ease: 'Linear',
            onComplete: () => {
                meteor.isReady = true;
            }
        });
    }

    createFireballBar(fireball) {
        fireball.background = this.scene.add.rectangle(this.width / this.skillAmount * 2, this.height - 50, this.width / this.skillAmount / 2, 100, 0xaaaaaa, 1).setOrigin(0.5);
        fireball.Icon = this.scene.add.image(fireball.background.x, fireball.background.y, 'fireball').setOrigin(0.5).setScale(0.05);
        fireball.bar = this.scene.add.rectangle(fireball.background.x - fireball.background.width / 2, this.height, 0, 30, 0xff0000, 1).setOrigin(0, 0.5);        
    }

    fireballCooldown(fireball) {
        fireball.bar.width = fireball.background.width;
        const tween = this.scene.tweens.add({
            targets: fireball.bar,
            width: 0,
            duration: fireball.cooldown,
            ease: 'Linear',
            onComplete: () => {
                fireball.isReady = true;
            }
        });
    }

    createFireAuraBar(fireAura) {
       fireAura.background = this.scene.add.rectangle(this.width / this.skillAmount * 3, this.height - 50, this.width / this.skillAmount / 2, 100, 0xaaaaaa, 1).setOrigin(0.5);
       fireAura.icon = this.scene.add.image(fireAura.background.x, fireAura.background.y, 'fireAura').setOrigin(0.5).setScale(0.05);
       fireAura.bar = this.scene.add.rectangle(fireAura.background.x -fireAura.background.width / 2, this.height, 0, 30, 0xff0000, 1).setOrigin(0, 0.5);        
    }

    fireAuraCooldown(fireAura) {
       fireAura.bar.width =fireAura.background.width;
        const tween = this.scene.tweens.add({
            targets: fireAura.bar,
            width: 0,
            duration: fireAura.cooldown,
            ease: 'Linear',
            onComplete: () => {
                fireAura.isReady = true;
            }
        });
    }
}